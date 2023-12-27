import { gql } from '__generated__/gql'

export const getPayments = gql(`
    query GetPayments($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {
        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies type: $type, status: $status, conversion: $conversion) {
            _id
            debitAmount
            debitCurrency
            creditAmount
            creditor {
                creditorName
            }
            isOutbound
            status
            transactionReference
            creditCurrency
            mainCreditCurrency
            mainDebitCurrency
    }
  }
`)

export const paymentsFullTextSearch = gql(`
    query PaymentsFullTextSearch($text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String] $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {
        PaymentsFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies, type: $type, status: $status, conversion: $conversion) {
            _id
            debitAmount
            debitCurrency
            creditAmount
            creditor {
                creditorName
            }
            isOutbound
            status
            transactionReference
            creditCurrency,
            mainCreditCurrency,
            mainDebitCurrency
    }
  }
`)

export const getPaymentById = gql(`
    query GetPaymentById($id: String!) {
        GetPaymentById(id: $id) {
            _id
            createdAt
            creditAmount
            creditCurrency
            creditorAccount
            debtorAccount
            debitAmount
            debitCurrency
            mainCreditCurrency
            mainDebitCurrency
            created {
              firstName
              lastName
            }
            creditor {
              creditorName
            }
            debtor {
              debtorName
            }  
            reference {
              debtorCurrencyType
              creditorCurrencyType
            }
            foreignExchange {
              allInRate
            }
            transactionReference
            processFlow
            status
    }
  }
`)

export const getPaymentsCurrencies = gql(`
    query getPaymentsCurrencies($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {
        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {
            debitCurrency
            creditCurrency
    }
  }
`)
