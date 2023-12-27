import { useContext, useState } from 'react'
import { useSubscription } from '@apollo/client'
import { MutationQuotePriceReceivedArgs, OnQuotePriceReceivedSubscription } from '__generated__/graphql'
import { onQuotePriceReceived } from 'state/contextProviders/apollo/subscriptions/onQuotePriceReceived'
import { ConversionsContext } from 'context/Provider'
import { SetErrorMsg, SetQuoteLoading, setQuote } from 'context/Actions'

export type QuoteErrorCode =
  | 'PricingNotFoundException'
  | 'PayloadErrorException'
  | 'PayloadErrorException'
  | 'NotImplementedException'
  | 'InternalServerErrorException'
  | 'InsufficientFundException'
  | 'InsufficientFundException'

export type Quote = {
  fee: string
  sourceAmount: string
  destinationAmount: string
}

export type useQuoteProps = {
  error: QuoteErrorCode | undefined
  quote: Quote
}

export const useQuote = () => {
  const {
    dispatch,
    state: { quote: StateQuote },
  } = useContext(ConversionsContext)

  useSubscription(onQuotePriceReceived, {
    onData: ({ data }) => {
      const quoteData = data?.data
      if (quoteData) OnQuoteReceived(quoteData)
    },
  })

  const [error, setError] = useState<QuoteErrorCode | string>()

  const [emptyQuote] = useState({
    allInRate: '',
    sourceAmount: '',
    destinationAmount: '',
    sourceCurrency: '',
    destinationCurrency: '',
  })

  function OnQuoteReceivedErrorHandler(errorCode: QuoteErrorCode, errorMsg: string) {
    switch (errorCode) {
      default:
        setError(errorMsg ?? errorCode)
        dispatch(setQuote(emptyQuote))
        dispatch(SetQuoteLoading(false))
    }
  }

  const OnQuoteReceived = (data: OnQuotePriceReceivedSubscription) => {
    const quoteReceived = data?.OnQuotePriceReceived as Partial<MutationQuotePriceReceivedArgs>
    const errorCode = data?.OnQuotePriceReceived?.errorCode as QuoteErrorCode
    const errorMsg = data?.OnQuotePriceReceived?.errorMessage as string

    if (errorCode) {
      dispatch(SetErrorMsg(errorMsg || errorCode))
      return OnQuoteReceivedErrorHandler(errorCode, errorMsg)
    } else {
      setError(undefined)
      dispatch(SetErrorMsg(undefined))
      dispatch(setQuote(quoteReceived))
      dispatch(SetQuoteLoading(false))
    }
  }

  return {
    error,
    emptyQuote,
    quote: !StateQuote ? emptyQuote : StateQuote,
  }
}
