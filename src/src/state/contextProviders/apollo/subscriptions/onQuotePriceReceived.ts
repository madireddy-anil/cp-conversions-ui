import { gql } from '__generated__/gql'

export const onQuotePriceReceived = gql(/* GraphQL */ `
  subscription OnQuotePriceReceived {
    OnQuotePriceReceived {
      accountId
      allInRate
      destinationAmount
      destinationCurrency
      destinationMainCurrency
      entityId
      errorCode
      errorMessage
      fee
      sourceAmount
      sourceCurrency
      sourceMainCurrency
      userId
    }
  }
`)
