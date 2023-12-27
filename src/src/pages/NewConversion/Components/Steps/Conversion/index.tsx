import React, { useContext, useEffect, useState } from 'react'
import { Text, Form, Spacer, Button, Checkbox, Input } from '@payconstruct/design-system'
import Message from './Message'
import Buttons from './Buttons'
import IndicativeRate from './Rate'
import { getClientAccounts } from 'state/contextProviders/apollo/queries/Accounts'
import { useMutation, useQuery } from '@apollo/client'
import { Account } from '__generated__/graphql'
import SellInput from './Sell'
import BuyInput from './Buy'
import { requestQuote } from 'state/contextProviders/apollo/mutations/RequestQuote'
import { Hooks } from '@payconstruct/fe-utils'
import {
  SetBuyAccount,
  SetFullBalanceChecked,
  SetLastActiveInput,
  SetQuoteLoading,
  SetSellAmount,
  updateDescription,
} from 'context/Actions'
import Title from './Title'
import { NewAccountModalMFE } from '../../Modal/NewAccountModalMFE'
import { onFailNewAccountCreation } from 'pages/Error/NewAccountCraetionFail'
import { ConversionsContext } from 'context/Provider'
import { formatCurrency } from 'helpers/customHelpers/customHelper'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { featureFlag } from 'config/variables'

const { useDebounce, useCurrencies } = Hooks

const Conversion: React.FC = () => {
  const [form] = Form.useForm()
  const LDFlags = useFlags()
  const { currencies } = useCurrencies()
  const {
    dispatch,
    state: {
      quote,
      sellAmount,
      buyAmount,
      sellAccount,
      buyAccount,
      errMessage,
      lastActiveInput,
      fullBalanceChecked,
      description,
    },
  } = useContext(ConversionsContext)
  const [showNewAccModal, setNewAccModal] = useState<boolean>(false)
  const [clientAccounts, setClientAccounts] = useState<Account[]>([])

  const [requestQuoteMutation] = useMutation(requestQuote)

  useEffect(() => {
    if (sellAccount) {
      form.setFieldsValue({
        sellCurrency: sellAccount?.currency,
      })
    }
  }, [sellAccount])

  useEffect(() => {
    if (errMessage) {
      form.setFields([
        {
          name: 'sellAmount',
          errors: [errMessage],
        },
      ])
    }
  }, [errMessage])

  useEffect(() => {
    form.setFieldsValue({
      sellAmount: formatCurrency(quote?.sourceAmount ?? undefined, sellAccount?.currencyType),
      buyAmount: formatCurrency(quote?.destinationAmount ?? undefined, buyAccount?.currencyType),
    })
  }, [quote])

  const { refetch: refetchClientAccounts } = useQuery(getClientAccounts, {
    fetchPolicy: 'cache-first',
    onCompleted: (clientAccounts: { GetClientAccounts: { accounts: Account[] } }) => {
      // setClientAccounts(
      //   clientAccounts.GetClientAccounts.accounts?.filter(
      //     (account) => Number(account?.availableBalance) >= 1
      //   ) ?? []
      // );
      setClientAccounts(clientAccounts?.GetClientAccounts?.accounts ?? [])
    },
  })

  useDebounce(
    () => {
      if (
        (Number(sellAmount) > 0 || Number(buyAmount) > 0) &&
        sellAccount?.currency &&
        buyAccount?.currency &&
        sellAccount?.id &&
        buyAccount?.id &&
        !errMessage
      ) {
        dispatch(SetQuoteLoading(true))
        requestQuoteMutation({
          variables: {
            quote: {
              accountId: sellAccount?.id ?? '',
              destinationAmount: lastActiveInput === 'Buy' ? buyAmount : !sellAmount ? buyAmount : '',
              sourceAmount: lastActiveInput === 'Sell' ? sellAmount : !buyAmount ? sellAmount : '',
              sourceCurrency: sellAccount?.currency ?? '',
              destinationCurrency: buyAccount?.currency ?? '',
              sourceMainCurrency: sellAccount?.mainCurrency,
              destinationMainCurrency: buyAccount?.mainCurrency,
            },
          },
        })
      }
    },
    1500,
    [sellAmount, buyAmount, sellAccount, buyAccount]
  )

  return (
    <div>
      <Title />

      <Form
        id="new-conversion-form"
        form={form}
        initialValues={{
          sellAmount: formatCurrency(quote?.sourceAmount ?? undefined, sellAccount?.currencyType),
          buyAmount: formatCurrency(quote?.destinationAmount ?? undefined, buyAccount?.currencyType),
          sellCurrency: sellAccount?.currency,
          buyCurrency: buyAccount?.currency,
          fullBalance: fullBalanceChecked,
          description: description,
        }}
      >
        <SellInput form={form} accounts={clientAccounts} currencies={currencies} />
        <IndicativeRate />
        <BuyInput form={form} accounts={clientAccounts} currencies={currencies} />
        {buyAccount?.currency &&
          !buyAccount?.accountIdentification?.accountNumber &&
          (!LDFlags[featureFlag.hideNewPaymentOption] ? (
            <>
              <Text size="small" style={{ display: 'flex' }}>
                You don’t have a {buyAccount?.currency} account. Do you want to
                {'  '}
                <Button
                  type="link"
                  label="create one?"
                  style={{ textDecoration: 'underline', marginLeft: '5px' }}
                  onClick={() => setNewAccModal(true)}
                />
              </Text>
              <Spacer size={30} />
              <NewAccountModalMFE
                title={`Create a new ${buyAccount?.currency} account`}
                visible={showNewAccModal}
                toggleShowCallback={value => {
                  console.log('toggleShowCallback')
                  setNewAccModal(value)
                }}
                onSuccessNewAccountCreation={data => {
                  console.log('onSuccess_Account_creation_callback', data)
                  dispatch(SetBuyAccount(data?.data ?? undefined))
                  refetchClientAccounts()
                }}
                onFailNewAccountCreation={() => {
                  console.log('onFail_Account_creation_callback')
                  onFailNewAccountCreation()
                }}
              />
            </>
          ) : (
            <Text>You don&apos;t have a {buyAccount?.currency} account.</Text>
          ))}
        {sellAccount?.currency && buyAccount?.currency && (
          <>
            <Spacer size={20} />
            <Form.Item name="fullBalance" valuePropName="checked">
              <Checkbox
                label={'Sell full account balance'}
                onChange={check => {
                  const { checked } = check.target
                  dispatch(SetFullBalanceChecked(checked))
                  if (checked) {
                    dispatch(SetLastActiveInput('Sell'))
                    dispatch(SetSellAmount(sellAccount?.availableBalance ?? undefined))
                    form.setFieldsValue({
                      sellAmount: formatCurrency(sellAccount?.availableBalance ?? undefined, sellAccount.currencyType),
                    })
                  } else {
                    // form.setFieldsValue({
                    //   sellAmount: undefined,
                    //   buyAmount: undefined
                    // });
                  }
                }}
              />
            </Form.Item>
          </>
        )}
        <Input
          type="textarea"
          rules={[
            {
              pattern: new RegExp(/^(?=.*[^\W_])[\w ]*$/),
              message: 'Payment description does not allow for special characters.',
            },
          ]}
          name={'description'}
          label={'Description'}
          placeholder={'Add you description'}
          style={{ height: '80px' }}
          onChange={e => dispatch(updateDescription(e?.target?.value))}
        />
      </Form>
      {sellAccount?.accountIdentification?.accountNumber && quote?.allInRate && <Message />}
      <Buttons />
    </div>
  )
}

export { Conversion }
