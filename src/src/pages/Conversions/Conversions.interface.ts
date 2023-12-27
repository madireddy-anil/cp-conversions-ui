import { Moment } from 'moment-timezone'
import { PaymentType } from './enums'
export interface MyWindow extends Window {
  myFunction(): void
}
export interface PaymentFilterForm {
  limit: number
  fromToDate?: [Moment, Moment] | null
  dateFrom?: string | undefined
  dateTo?: string | undefined
  currencies?: [string] | undefined
  debitCurrencies?: [string] | undefined
  type?: PaymentType
  status?: string | undefined
  conversion?: boolean
}

export interface SummaryListProps {
  label: string
  value: string | number | undefined
  hidden: boolean
}
