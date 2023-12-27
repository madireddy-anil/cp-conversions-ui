import { gql } from '__generated__/gql'

export const requestQuote = gql(/* GraphQL */ `
  mutation RequestQuote($quote: QuoteRequestInput) {
    RequestQuote(quote: $quote) {
      EventId
    }
  }
`)
