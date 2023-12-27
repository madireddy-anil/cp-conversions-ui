import moment from 'moment-timezone'
import { Currency } from '@payconstruct/fe-utils/dist/Hooks/useCurrencies'
import { Helpers } from '@payconstruct/fe-utils'
import { Account } from '__generated__/graphql'
import { formatValue } from 'react-currency-input-field'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'

const { truncateAccountNumber, fractionFormat } = Helpers

export const paymentFilterFormValidation = (paymentFilterValues: PaymentFilterForm) => {
  const isFromToDateSame =
    paymentFilterValues?.fromToDate &&
    moment(paymentFilterValues.fromToDate[0]).format('ll') === moment(paymentFilterValues.fromToDate[1]).format('ll')

  // if dates were same then add time accordingly
  if (paymentFilterValues?.fromToDate && isFromToDateSame) {
    const [start, end] = paymentFilterValues.fromToDate
    paymentFilterValues.dateFrom = start.startOf('day').format('x')
    paymentFilterValues.dateTo = end.endOf('day').format('x')
  } else {
    paymentFilterValues.dateFrom = paymentFilterValues?.fromToDate?.length
      ? moment(paymentFilterValues.fromToDate[0])?.format('x')
      : undefined
    paymentFilterValues.dateTo = paymentFilterValues?.fromToDate?.length
      ? moment(paymentFilterValues.fromToDate[1])?.format('x')
      : undefined
  }
  return paymentFilterValues
}

export function cleanCurrencyFormat(value: string) {
  const cleanValue = String(value).replace(/[^\d.-]/g, '')
  const [digit, decimals] = cleanValue.split('.')

  if (decimals !== undefined) return [digit, decimals].join('.')

  return digit
}

type ValueType = string | number | undefined
export function formatCurrency(inputValue: ValueType, currencyType: Account['currencyType']) {
  return formatValue({
    value: cleanCurrencyFormat(String(inputValue)),
    decimalScale: currencyType === 'fiat' ? 2 : 6,
    intlConfig: { locale: 'en-US' },
  })
}

export const HighestBalanceAccount = (accounts: Account[], currency: string) => {
  const sameCurrencyAccounts = (accounts || []).filter((accountItem: Account) => accountItem.currency === currency)

  const highestBalanceOfSameCCYAccounts =
    sameCurrencyAccounts.length > 0 &&
    Math.max(...sameCurrencyAccounts.map((account: Account) => parseInt(account?.availableBalance ?? '')))

  const highestBalanceAccount =
    Number(highestBalanceOfSameCCYAccounts) > 0
      ? sameCurrencyAccounts.find(
          (accountItem: Account) => parseInt(accountItem?.availableBalance ?? '') === highestBalanceOfSameCCYAccounts
        )
      : sameCurrencyAccounts[0]
  return highestBalanceAccount
}

export const SortAccountsOnCurrencyAndBalance = (
  accounts: Account[],
  currency: string | undefined,
  type: 'sell' | 'buy'
) => {
  return accounts
    .filter(account => account?.currency === currency && Number(account?.availableBalance) >= (type === 'sell' ? 1 : 0))
    .sort((a, b) => Number(b?.availableBalance ?? 0) - Number(a?.availableBalance ?? 0))
}

export const formatDateAndTime = (date: Date | string | undefined, tz: string, format: string) => {
  const dateTime = moment(date)
  const formateDateTime = dateTime.tz(tz).format(format)
  return formateDateTime
}

export const hasConversionsFiltersExist = (filters: PaymentFilterForm) => {
  const { fromToDate, currencies, debitCurrencies, type, status } = filters
  return fromToDate?.length || currencies || debitCurrencies || type || status ? true : false
}

export const validateStrings = (stringOne: string | number | undefined | null, stringTwo?: string | undefined) => {
  if (stringOne && stringTwo) {
    return `${stringOne} ${stringTwo}`
  }
  if (stringOne) {
    return `${stringOne}`
  }
  if (stringTwo) {
    return `${stringTwo}`
  } else return undefined
}
export const currencyFormatter = (
  currencies: Currency[],
  currencyCode: string | undefined,
  mainCurrency: string | undefined
) => {
  let returnCurrency
  ;(currencies || [])
    .filter((currency: Currency) => currency?.mainCurrency && currency?.mainCurrency)
    .map((currency: Currency) => {
      if (mainCurrency && mainCurrency === currency?.code) {
        returnCurrency = `${currencyCode} (${currency?.name?.replace(/-/g, '')})`
      }
    })
  return returnCurrency ? returnCurrency : currencyCode
}

export const truncateAccountName = (accName: string) => {
  return accName && accName?.length > 18 ? `${accName?.slice(0, 18) + '...'}` : accName
}

export const accountDisplayName = (account: Account, currencies: Currency[]) => {
  return `${truncateAccountName(
    (account?.accountName || account?.accountIdentification?.IBAN) ?? ''
  )} | ${truncateAccountNumber(account?.accountIdentification?.accountNumber ?? '')} | ${fractionFormat(
    Number(account?.availableBalance)
  )} ${currencyFormatter(currencies, account?.currency, account?.mainCurrency ?? undefined)}`
}
