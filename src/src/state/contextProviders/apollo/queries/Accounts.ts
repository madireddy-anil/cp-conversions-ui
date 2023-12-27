import { gql } from '__generated__/gql'

export const getClientAccounts = gql(/* GraphQL */ `
  query GetClientAccounts($limit: Int, $nextToken: String) {
    GetClientAccounts(limit: $limit, nextToken: $nextToken) {
      accounts {
        accountIdentification {
          accountNumber
          IBAN
        }
        accountName
        availableBalance
        currency
        mainCurrency
        currencyType
        id
      }
    }
  }
`)

export const getAccountById = gql(/* GraphQL */ `
  query GetAccountById($id: ID!) {
    GetAccountById(id: $id) {
      accountIdentification {
        accountNumber
        IBAN
      }
      accountName
      availableBalance
      currency
      mainCurrency
      currencyType
      id
    }
  }
`)
