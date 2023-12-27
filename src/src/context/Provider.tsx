import React, { useMemo, useReducer } from 'react'
import { ConversionState, ConversionsStateProps } from './State'
import { ActionType } from './Actions'
import { ConversionsReducer } from './Reducer'

export const ConversionsContext = React.createContext<{
  state: ConversionsStateProps
  dispatch: React.Dispatch<ActionType>
}>({
  state: ConversionState,
  dispatch: () => null,
})

export interface ConversionsProviderProps {
  step?: number
  totalSteps?: number
}

const ConversionsProvider: React.FC<ConversionsProviderProps> = ({ children, step = 0, totalSteps = 2 }) => {
  const [state, dispatch] = useReducer(ConversionsReducer, {
    ...ConversionState,
    step,
    totalSteps,
  })
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch])

  return <ConversionsContext.Provider value={contextValue}>{children}</ConversionsContext.Provider>
}

export default ConversionsProvider
