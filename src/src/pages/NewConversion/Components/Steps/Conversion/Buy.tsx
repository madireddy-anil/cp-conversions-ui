import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Menu } from 'antd'
import { Button, Colors, Dropdown, InputAmount, Select, Spacer, Form } from '@payconstruct/design-system'
import {
  HighestBalanceAccount,
  SortAccountsOnCurrencyAndBalance,
  accountDisplayName,
  cleanCurrencyFormat,
  formatCurrency,
} from 'helpers/customHelpers/customHelper'
import { onMouseEvent } from '@payconstruct/design-system/dist/components/atoms/FormComponent/InputInterface'
import { useQuery } from '@apollo/client'
import { getCurrencyExchangePairs } from 'state/contextProviders/apollo/queries/CurrenciesPairs'
import CurrencyLabel from './CurrencyLabel'
import { Account } from '__generated__/graphql'
import { FormInstance } from 'antd'
import { ConversionsContext } from 'context/Provider'
import { SetBuyAccount, SetBuyAmount, SetErrorMsg, SetLastActiveInput } from 'context/Actions'
import strings from 'config/i18n/langMessages/en-US.json'
import { Currency } from '@payconstruct/fe-utils/dist/Hooks/useCurrencies'

import styles from '../Steps.module.sass'

const { noBuyAccountErr } = strings

interface SellProps {
  form: FormInstance
  accounts: Account[]
  currencies: Currency[]
}
const BuyInput: React.FC<SellProps> = ({ form, accounts, currencies }) => {
  const {
    dispatch,
    state: { fullBalanceChecked, sellAccount, sellAmount, buyAccount },
  } = useContext(ConversionsContext)

  const [buyCurrenciesAccounts, setBuyCurrenciesAccounts] = useState<Account[]>([])

  const { data: buyCurrenciesList } = useQuery(getCurrencyExchangePairs, {
    variables: {
      sellCurrency: sellAccount?.mainCurrency
        ? `${sellAccount?.currency}_${sellAccount?.mainCurrency}`
        : sellAccount?.currency ?? '',
    },
    skip: !sellAccount?.currency,
    fetchPolicy: 'cache-first',
    onCompleted: ({ GetCurrencyExchangePairs }) => {
      if (GetCurrencyExchangePairs === null) {
        dispatch(SetBuyAccount(undefined))
        form.setFieldsValue({ buyAmount: undefined, buyCurrency: undefined })
      }
      form.setFields([
        {
          name: 'buyCurrency',
          errors: GetCurrencyExchangePairs === null ? [noBuyAccountErr] : undefined,
        },
      ])
    },
  })

  const buyCurrencies = buyCurrenciesList?.GetCurrencyExchangePairs ?? []

  useEffect(() => {
    if (buyCurrencies?.length) {
      const getBuyAccounts: Account[] = []
      buyCurrencies.map(currency => {
        accounts
          .filter(account => account?.currency === currency?.buyCurrency)
          .map(item => {
            return getBuyAccounts.push(item)
          })
      })
      getBuyAccounts.sort((a, b) => a?.currency?.localeCompare(b?.currency))
      setBuyCurrenciesAccounts(getBuyAccounts)
    }
  }, [buyCurrencies, sellAmount])

  const removeDuplicatesBuyCurrencies = [
    ...new Map(
      (buyCurrencies || []).filter(Boolean).map(item => (item ? [item['buyCurrency'], item] : [item, item]))
    ).values(),
  ]
  const buyCurrenciesOptions: { label: React.ReactNode; value: string }[] = Array.from(
    removeDuplicatesBuyCurrencies
      .filter(currency => !currency?.restrictInCp && currency?.buyCurrency !== sellAccount?.currency)
      .map(currency => currency?.buyCurrency && currency?.buyCurrency)
  )
    .map(currency => {
      return {
        label: <CurrencyLabel currency={currency} />,
        value: currency ?? '',
        disabled: sellAccount?.currency === currency,
      }
    })
    .sort((a, b) => a?.value?.localeCompare(b?.value))

  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement
    const cleanValue = cleanCurrencyFormat(value)
    dispatch(SetBuyAmount(cleanValue))
    dispatch(SetLastActiveInput('Buy'))

    form.setFields([
      {
        name: 'buyAmount',
        value: cleanValue,
      },
    ])
  }

  const onMouseLeave = (event: onMouseEvent) => {
    const { value } = event.target as HTMLInputElement
    const [{ errors }] = form.getFieldsError().filter(item => {
      return String(item.name) === 'buyAmount'
    })
    form.setFields([
      {
        name: 'buyAmount',
        value: formatCurrency(value, buyAccount?.currencyType),
        errors,
      },
    ])
  }

  return (
    <>
      <div className={styles['form_wrapper']}>
        <div className={styles['form_wrapper-amount']}>
          <InputAmount
            floatingLabel
            label="You buy"
            name="buyAmount"
            placeholder="0.00"
            size="xlarge"
            type="text"
            suffix={<></>}
            disabled={buyCurrencies?.length < 1 || !buyAccount?.currency || fullBalanceChecked}
            onChange={onNumberChange}
            onMouseLeave={onMouseLeave}
          />
        </div>

        <div className={styles['form_wrapper-currency']}>
          <Form.Item name="buyCurrency">
            <Select
              label="Buy Currency"
              options={buyCurrencies?.length ? buyCurrenciesOptions : []}
              placeholder="Currency"
              size="large"
              disabled={buyCurrencies?.length < 1}
              onChange={(currency: string) => {
                const account = HighestBalanceAccount(accounts as Account[], currency)
                const buyAccount = account ? account : { id: '', currency: currency }
                dispatch(SetBuyAccount(buyAccount))
                dispatch(SetLastActiveInput('Buy'))
                dispatch(SetErrorMsg(undefined))
                if (!account) {
                  form.setFieldsValue({ buyAmount: undefined })
                  dispatch(SetBuyAmount(undefined))
                }
              }}
            />
          </Form.Item>
        </div>
      </div>
      <Spacer size={20} />
      {buyAccount?.accountIdentification?.accountNumber && (
        <Dropdown
          trigger={['click']}
          overlayClassName={styles['toAccountMenuClass']}
          arrow
          placement="bottomLeft"
          overlay={
            <Menu>
              {buyCurrenciesAccounts?.length > 0 &&
                SortAccountsOnCurrencyAndBalance(buyCurrenciesAccounts, buyAccount?.currency, 'buy')?.map(account => (
                  <Menu.Item
                    style={{
                      background: buyAccount?.id === account.id ? Colors.grey.neutral50 : '',
                      fontWeight: buyAccount?.id === account.id ? 'bold' : '',
                    }}
                    key={account.id}
                    onClick={() => {
                      dispatch(SetBuyAccount(account))
                    }}
                  >
                    {accountDisplayName(account, currencies)}
                  </Menu.Item>
                ))}
            </Menu>
          }
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="secondary"
              label={accountDisplayName(buyAccount as Account, currencies)}
              icon={{
                name: 'chevronsDown',
                position: 'right',
              }}
            />
          </div>
        </Dropdown>
      )}
      <Spacer size={10} />
    </>
  )
}

export default BuyInput
