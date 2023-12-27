import { gql } from '__generated__/gql'

export const getCurrencyExchangePairs = gql(/* GraphQL */ `
  query GetCurrencyExchangePairs($sellCurrency: String!) {
    GetCurrencyExchangePairs(sellCurrency: $sellCurrency) {
      buyCurrency
      restrictInCp
    }
  }
`)
