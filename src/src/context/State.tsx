import { Account, MutationQuotePriceReceivedArgs } from '__generated__/graphql'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
export interface ConversionsStateProps {
  timeZone: string
  returnUrl: string

  // new conversion
  step: number
  totalSteps: number
  stepStatus?: 'error' | 'finish'
  description: string
  fullBalanceChecked: boolean

  sellAccount: Partial<Account> | undefined
  sellAmount: string | undefined
  buyAccount: Partial<Account> | undefined
  buyAmount: string | undefined
  lastActiveInput: 'Sell' | 'Buy' | undefined

  quoteLoading: boolean
  quote: Partial<MutationQuotePriceReceivedArgs>
  errMessage: string | undefined

  // conversions
  showFilters: boolean
  conversionsNextToken: string | undefined
  conversionSearchText: string
  hasConversionsFiltersActive: boolean
  conversionsFilters: PaymentFilterForm
}

export const ConversionState: ConversionsStateProps = {
  timeZone: 'Asia/Hong_Kong',
  returnUrl: '/',

  // new conversion
  errMessage: undefined,
  lastActiveInput: undefined,
  quoteLoading: false,
  quote: {
    entityId: '',
    userId: '',
    allInRate: '',
    sourceCurrency: '',
    sourceAmount: '',
    destinationAmount: '',
    destinationCurrency: '',
  },
  stepStatus: undefined,
  totalSteps: 0,
  step: 0,
  description: '',
  fullBalanceChecked: false,

  sellAmount: undefined,
  sellAccount: {
    accountIdentification: { accountNumber: '' },
    currency: undefined,
    accountName: '',
    balance: '',
    id: '',
  },

  buyAmount: undefined,
  buyAccount: {
    accountIdentification: { accountNumber: '' },
    currency: undefined,
    accountName: '',
    balance: '',
    id: '',
  },

  // conversions
  showFilters: false,
  conversionsNextToken: undefined,
  conversionSearchText: '',
  hasConversionsFiltersActive: false,
  conversionsFilters: {
    limit: 50,
    fromToDate: undefined,
    dateFrom: undefined,
    dateTo: undefined,
    currencies: undefined,
    debitCurrencies: undefined,
    type: undefined,
    status: undefined,
    conversion: true,
  },
}
