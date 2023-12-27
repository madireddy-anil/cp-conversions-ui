import { hasConversionsFiltersExist } from 'helpers/customHelpers/customHelper'
import { ActionType, Actions } from './Actions'
import { ConversionsStateProps } from './State'

export function ConversionsReducer(state: ConversionsStateProps, action: ActionType): ConversionsStateProps {
  switch (action.type) {
    case Actions.NEXT_STEP:
      if (state.step === state.totalSteps - 1) return state
      return { ...state, step: state.step + 1 }

    case Actions.PREVIOUS_STEP:
      if (state.step === 0) return state
      return { ...state, step: state.step - 1 }

    case Actions.SET_STEP_STATUS:
      return { ...state, stepStatus: action.payload }

    case Actions.SET_QUOTE:
      return { ...state, quote: action.payload }

    case Actions.SET_SELL_ACCOUNT:
      return { ...state, sellAccount: action.payload }

    case Actions.SET_BUY_ACCOUNT:
      return { ...state, buyAccount: action.payload }

    case Actions.SET_SELL_AMOUNT:
      return { ...state, sellAmount: action.payload }

    case Actions.SET_BUY_AMOUNT:
      return { ...state, buyAmount: action.payload }

    case Actions.QUOTE_LOADING:
      return { ...state, quoteLoading: action.payload }

    case Actions.SET_LAST_ACTIVE_INPUT:
      return { ...state, lastActiveInput: action.payload }

    case Actions.SET_FULL_BALANCE_CHECKED:
      return { ...state, fullBalanceChecked: action.payload }

    case Actions.SET_ERROR:
      return { ...state, errMessage: action.payload }

    case Actions.SET_DESCRIPTION:
      return { ...state, description: action.payload }

    // conversions dashboard---

    case Actions.TOGGLE_FILTERS:
      return { ...state, showFilters: action.payload }

    case Actions.SET_SEARCH_TEXT:
      return { ...state, conversionSearchText: action.payload }

    case Actions.UPDATE_CONVERSIONS_FILTERS:
      return {
        ...state,
        conversionsFilters: action.payload,
        hasConversionsFiltersActive: hasConversionsFiltersExist(action.payload),
        conversionsNextToken: action?.nextToken ? action?.nextToken : undefined,
      }

    default:
      return state
  }
}
