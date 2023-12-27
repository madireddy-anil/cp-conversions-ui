import { Account, MutationQuotePriceReceivedArgs } from '__generated__/graphql'
import { PaymentFilterForm } from 'pages/Conversions/Conversions.interface'
import { ConversionsStateProps } from './State'

export const Actions = {
  SET_STEP: 'SET_STEP',
  NEXT_STEP: 'NEXT_STEP',
  PREVIOUS_STEP: 'PREVIOUS_STEP',
  SET_STEP_STATUS: 'SET_STEP_STATUS',
  SET_RETURN_URL: 'SET_RETURN_URL',
  SET_SELL_ACCOUNT: 'SET_SELL_ACCOUNT',
  SET_BUY_ACCOUNT: 'SET_BUY_ACCOUNT',
  SET_SELL_AMOUNT: 'SET_SELL_AMOUNT',
  SET_BUY_AMOUNT: 'SET_BUY_AMOUNT',
  SET_QUOTE: 'SET_QUOTE',
  QUOTE_LOADING: 'QUOTE_LOADING',
  SET_LAST_ACTIVE_INPUT: 'SET_LAST_ACTIVE_INPUT',
  SET_FULL_BALANCE_CHECKED: 'SET_FULL_BALANCE_CHECKED',
  SET_ERROR: 'SET_ERROR',
  SET_DESCRIPTION: 'SET_DESCRIPTION',

  // new----
  TOGGLE_FILTERS: 'TOGGLE_FILTERS',
  SET_SEARCH_TEXT: 'SET_SEARCH_TEXT',
  UPDATE_BENE_FILTERS: 'UPDATE_BENE_FILTERS',
  UPDATE_CONVERSIONS_FILTERS: 'UPDATE_CONVERSIONS_FILTERS',
} as const

export type PayloadAction<T> = T

type NextStepType = { type: typeof Actions.NEXT_STEP }
export const nextStep = (): NextStepType => ({
  type: Actions.NEXT_STEP,
})

type PreviousStepType = { type: typeof Actions.PREVIOUS_STEP }
export const previousStep = (): PreviousStepType => ({
  type: Actions.PREVIOUS_STEP,
})

type SetQuote = {
  type: typeof Actions.SET_QUOTE
  payload: Partial<MutationQuotePriceReceivedArgs>
}
export const setQuote = (quote: Partial<MutationQuotePriceReceivedArgs>) => ({
  type: Actions.SET_QUOTE,
  payload: quote,
})

type SetSellAccount = {
  type: typeof Actions.SET_SELL_ACCOUNT
  payload: Account | undefined
}
export const SetSellAccount = (payload: Account | undefined) => {
  return {
    type: Actions.SET_SELL_ACCOUNT,
    payload,
  }
}

type SetStepStatus = {
  type: typeof Actions.SET_STEP_STATUS
  payload: ConversionsStateProps['stepStatus']
}
export const setStepStatus = (payload: ConversionsStateProps['stepStatus']) => {
  return {
    type: Actions.SET_STEP_STATUS,
    payload,
  }
}

type SetBuyAccount = {
  type: typeof Actions.SET_BUY_ACCOUNT
  payload: Account | undefined
}
export const SetBuyAccount = (payload: Account | undefined) => {
  return {
    type: Actions.SET_BUY_ACCOUNT,
    payload,
  }
}

type SetSellAmount = {
  type: typeof Actions.SET_SELL_AMOUNT
  payload: string | undefined
}
export const SetSellAmount = (payload: string | undefined) => {
  return {
    type: Actions.SET_SELL_AMOUNT,
    payload,
  }
}

type SetBuyAmount = {
  type: typeof Actions.SET_BUY_AMOUNT
  payload: string | undefined
}
export const SetBuyAmount = (payload: string | undefined) => {
  return {
    type: Actions.SET_BUY_AMOUNT,
    payload,
  }
}

type SetQuoteLoading = {
  type: typeof Actions.QUOTE_LOADING
  payload: boolean
}
export const SetQuoteLoading = (payload: boolean) => {
  return {
    type: Actions.QUOTE_LOADING,
    payload,
  }
}

type SetLastActiveInput = {
  type: typeof Actions.SET_LAST_ACTIVE_INPUT
  payload: 'Sell' | 'Buy' | undefined
}
export const SetLastActiveInput = (payload: 'Sell' | 'Buy' | undefined) => {
  return {
    type: Actions.SET_LAST_ACTIVE_INPUT,
    payload,
  }
}

type SetFullBalanceChecked = {
  type: typeof Actions.SET_FULL_BALANCE_CHECKED
  payload: boolean
}
export const SetFullBalanceChecked = (payload: boolean) => {
  return {
    type: Actions.SET_FULL_BALANCE_CHECKED,
    payload,
  }
}

type SetErrorMsg = {
  type: typeof Actions.SET_ERROR
  payload: string | undefined
}
export const SetErrorMsg = (payload: string | undefined) => {
  return {
    type: Actions.SET_ERROR,
    payload,
  }
}

// new-----
type SetToggleFilters = {
  type: typeof Actions.TOGGLE_FILTERS
  payload: boolean
}
export const ToggleFilters = (payload: boolean) => {
  return {
    type: Actions.TOGGLE_FILTERS,
    payload,
  }
}

type SetSearchText = {
  type: typeof Actions.SET_SEARCH_TEXT
  payload: string
}
export const SetSearchText = (payload: string) => {
  return {
    type: Actions.SET_SEARCH_TEXT,
    payload,
  }
}

type SetConversionsFilters = {
  type: typeof Actions.UPDATE_CONVERSIONS_FILTERS
  payload: PaymentFilterForm
  nextToken: string | undefined
}
export const SetConversionsFilters = (payload: PaymentFilterForm, nextToken?: string | undefined) => {
  return {
    type: Actions.UPDATE_CONVERSIONS_FILTERS,
    payload,
    nextToken,
  }
}

type SetDescription = { type: typeof Actions.SET_DESCRIPTION; payload: string }
export const updateDescription = (description: string): SetDescription => ({
  type: Actions.SET_DESCRIPTION,
  payload: description,
})

//! Add All types here to see them in the ActionsType
export type ActionType =
  | NextStepType
  | PreviousStepType
  | SetSellAccount
  | SetBuyAccount
  | SetSellAmount
  | SetBuyAmount
  | SetQuote
  | SetQuoteLoading
  | SetLastActiveInput
  | SetStepStatus
  | SetFullBalanceChecked
  | SetErrorMsg
  | SetDescription

  /// new---
  | SetToggleFilters
  | SetSearchText
  | SetConversionsFilters
