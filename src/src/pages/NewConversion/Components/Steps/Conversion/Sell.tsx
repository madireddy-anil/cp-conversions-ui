import React, { ChangeEvent, useContext } from 'react'
import { Button, Colors, Dropdown, Form, InputAmount, Select, Spacer } from '@payconstruct/design-system'
import { Menu } from 'antd'
import CurrencyLabel from './CurrencyLabel'
import { Account } from '__generated__/graphql'
import { FormInstance } from 'antd'
import { ConversionsContext } from 'context/Provider'
import { onMouseEvent } from '@payconstruct/design-system/dist/components/atoms/FormComponent/InputInterface'
import { Currency } from '@payconstruct/fe-utils/dist/Hooks/useCurrencies'
import { SetErrorMsg, SetFullBalanceChecked, SetLastActiveInput, SetSellAccount, SetSellAmount } from 'context/Actions'
import strings from 'config/i18n/langMessages/en-US.json'
import styles from '../Steps.module.sass'
import {
  HighestBalanceAccount,
  SortAccountsOnCurrencyAndBalance,
  accountDisplayName,
  cleanCurrencyFormat,
  formatCurrency,
} from 'helpers/customHelpers/customHelper'

const { noSellAccountErr } = strings

interface SellProps {
  form: FormInstance
  accounts: Account[]
  currencies: Currency[]
}
const SellInput: React.FC<SellProps> = ({ form, accounts, currencies }) => {
  const {
    dispatch,
    state: { fullBalanceChecked, errMessage, sellAccount, buyAccount },
  } = useContext(ConversionsContext)

  const currencyOptions: { label: React.ReactNode; value: string }[] = [
    ...new Map((accounts || []).filter(Boolean).map(item => (item ? [item['currency'], item] : [item, item]))).values(),
  ]
    .map(account => {
      return {
        label: <CurrencyLabel currency={account?.currency} />,
        value: account?.currency ?? '',
        disabled: buyAccount?.currency === account?.currency,
      }
    })
    .sort((a, b) => a?.value?.localeCompare(b?.value))

  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement
    const cleanValue = cleanCurrencyFormat(value)
    dispatch(SetSellAmount(cleanValue))
    dispatch(SetLastActiveInput('Sell'))
    dispatch(SetFullBalanceChecked(false))
    form.setFieldsValue({ sellAmount: cleanValue })
    if (Number(sellAccount?.availableBalance) < Number(cleanValue)) {
      dispatch(SetErrorMsg(`You don't have enough funds in your account.`))
    } else dispatch(SetErrorMsg(undefined))
  }

  const onMouseLeave = (event: onMouseEvent) => {
    const { value } = event.target as HTMLInputElement
    const [{ errors }] = form.getFieldsError().filter(item => {
      return String(item.name) === 'sellAmount'
    })
    form.setFields([
      {
        name: 'sellAmount',
        value: formatCurrency(value, sellAccount?.currencyType),
        errors,
      },
    ])
  }

  const handleSellAmountOnAccountSelection = (account: Account | undefined) => {
    if (fullBalanceChecked) {
      dispatch(SetSellAmount(account?.availableBalance ?? undefined))
      form.setFieldsValue({
        sellAmount: formatCurrency(account?.availableBalance ?? undefined, sellAccount?.currencyType),
      })
    }
  }

  return (
    <>
      <div className={styles['form_wrapper']}>
        <div className={styles['form_wrapper-amount']}>
          <InputAmount
            help={errMessage}
            floatingLabel
            label="You sell"
            name="sellAmount"
            placeholder="0.00"
            size="xlarge"
            type="text"
            suffix={<></>}
            disabled={!buyAccount?.currency || fullBalanceChecked}
            validateStatus={errMessage ? 'error' : 'success'}
            onChange={onNumberChange}
            onMouseLeave={onMouseLeave}
          />
        </div>

        <div className={styles['form_wrapper-currency']}>
          <Form.Item name="sellCurrency">
            <Select
              label="Sell Currency"
              placeholder="Currency"
              options={currencyOptions}
              size="large"
              onChange={value => {
                const account = HighestBalanceAccount(accounts as Account[], value)
                handleSellAmountOnAccountSelection(account)
                dispatch(SetSellAccount(account))
                dispatch(SetLastActiveInput('Sell'))
                dispatch(SetErrorMsg(undefined))
                !account?.accountIdentification?.accountNumber &&
                  form.setFields([
                    {
                      name: 'sellCurrency',
                      errors: [noSellAccountErr],
                    },
                  ])
              }}
            />
          </Form.Item>
        </div>
      </div>
      <Spacer size={10} />
      {sellAccount?.accountIdentification?.accountNumber && (
        <Dropdown
          trigger={['click']}
          overlayClassName={styles['toAccountMenuClass']}
          arrow
          placement="bottomLeft"
          overlayStyle={{ color: 'red' }}
          overlay={
            <Menu>
              {accounts?.length > 0 &&
                SortAccountsOnCurrencyAndBalance(accounts, sellAccount?.currency, 'sell')?.map(account => (
                  <Menu.Item
                    key={account?.id}
                    style={{
                      background: sellAccount?.id === account.id ? Colors.grey.neutral50 : '',
                      fontWeight: sellAccount?.id === account.id ? 'bold' : '',
                    }}
                    onClick={() => {
                      form.setFieldsValue({
                        sellCurrency: account?.currency,
                      })
                      handleSellAmountOnAccountSelection(account)
                      dispatch(SetSellAccount(account as Account))
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
              label={accountDisplayName(sellAccount as Account, currencies)}
              icon={{
                name: 'chevronsDown',
                position: 'right',
              }}
            />
          </div>
        </Dropdown>
      )}
    </>
  )
}

export default SellInput
