/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n": types.RequestQuoteDocument,
    "\n  query GetClientAccounts($limit: Int, $nextToken: String) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken) {\n      accounts {\n        accountIdentification {\n          accountNumber\n          IBAN\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n    }\n  }\n": types.GetClientAccountsDocument,
    "\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n        IBAN\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      currencyType\n      id\n    }\n  }\n": types.GetAccountByIdDocument,
    "\n  query GetCurrencyExchangePairs($sellCurrency: String!) {\n    GetCurrencyExchangePairs(sellCurrency: $sellCurrency) {\n      buyCurrency\n      restrictInCp\n    }\n  }\n": types.GetCurrencyExchangePairsDocument,
    "\n    query GetPayments($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n    }\n  }\n": types.GetPaymentsDocument,
    "\n    query PaymentsFullTextSearch($text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String] $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        PaymentsFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies, type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency,\n            mainDebitCurrency\n    }\n  }\n": types.PaymentsFullTextSearchDocument,
    "\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            debtor {\n              debtorName\n            }  \n            reference {\n              debtorCurrencyType\n              creditorCurrencyType\n            }\n            foreignExchange {\n              allInRate\n            }\n            transactionReference\n            processFlow\n            status\n    }\n  }\n": types.GetPaymentByIdDocument,
    "\n    query getPaymentsCurrencies($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            debitCurrency\n            creditCurrency\n    }\n  }\n": types.GetPaymentsCurrenciesDocument,
    "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      accountId\n      allInRate\n      destinationAmount\n      destinationCurrency\n      destinationMainCurrency\n      entityId\n      errorCode\n      errorMessage\n      fee\n      sourceAmount\n      sourceCurrency\n      sourceMainCurrency\n      userId\n    }\n  }\n": types.OnQuotePriceReceivedDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n"): (typeof documents)["\n  mutation RequestQuote($quote: QuoteRequestInput) {\n    RequestQuote(quote: $quote) {\n      EventId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetClientAccounts($limit: Int, $nextToken: String) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken) {\n      accounts {\n        accountIdentification {\n          accountNumber\n          IBAN\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetClientAccounts($limit: Int, $nextToken: String) {\n    GetClientAccounts(limit: $limit, nextToken: $nextToken) {\n      accounts {\n        accountIdentification {\n          accountNumber\n          IBAN\n        }\n        accountName\n        availableBalance\n        currency\n        mainCurrency\n        currencyType\n        id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n        IBAN\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      currencyType\n      id\n    }\n  }\n"): (typeof documents)["\n  query GetAccountById($id: ID!) {\n    GetAccountById(id: $id) {\n      accountIdentification {\n        accountNumber\n        IBAN\n      }\n      accountName\n      availableBalance\n      currency\n      mainCurrency\n      currencyType\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCurrencyExchangePairs($sellCurrency: String!) {\n    GetCurrencyExchangePairs(sellCurrency: $sellCurrency) {\n      buyCurrency\n      restrictInCp\n    }\n  }\n"): (typeof documents)["\n  query GetCurrencyExchangePairs($sellCurrency: String!) {\n    GetCurrencyExchangePairs(sellCurrency: $sellCurrency) {\n      buyCurrency\n      restrictInCp\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPayments($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n    }\n  }\n"): (typeof documents)["\n    query GetPayments($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query PaymentsFullTextSearch($text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String] $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        PaymentsFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies, type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency,\n            mainDebitCurrency\n    }\n  }\n"): (typeof documents)["\n    query PaymentsFullTextSearch($text: String!, $limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String] $debitCurrencies: [String], $type: PaymentType, $status: String, $conversion: Boolean) {\n        PaymentsFullTextSearch(text: $text, limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, debitCurrencies: $debitCurrencies, type: $type, status: $status, conversion: $conversion) {\n            _id\n            debitAmount\n            debitCurrency\n            creditAmount\n            creditor {\n                creditorName\n            }\n            isOutbound\n            status\n            transactionReference\n            creditCurrency,\n            mainCreditCurrency,\n            mainDebitCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            debtor {\n              debtorName\n            }  \n            reference {\n              debtorCurrencyType\n              creditorCurrencyType\n            }\n            foreignExchange {\n              allInRate\n            }\n            transactionReference\n            processFlow\n            status\n    }\n  }\n"): (typeof documents)["\n    query GetPaymentById($id: String!) {\n        GetPaymentById(id: $id) {\n            _id\n            createdAt\n            creditAmount\n            creditCurrency\n            creditorAccount\n            debtorAccount\n            debitAmount\n            debitCurrency\n            mainCreditCurrency\n            mainDebitCurrency\n            created {\n              firstName\n              lastName\n            }\n            creditor {\n              creditorName\n            }\n            debtor {\n              debtorName\n            }  \n            reference {\n              debtorCurrencyType\n              creditorCurrencyType\n            }\n            foreignExchange {\n              allInRate\n            }\n            transactionReference\n            processFlow\n            status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query getPaymentsCurrencies($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            debitCurrency\n            creditCurrency\n    }\n  }\n"): (typeof documents)["\n    query getPaymentsCurrencies($limit: Int, $nextToken: String, $dateFrom: String, $dateTo: String, $currencies: [String], $type: PaymentType, $status: String) {\n        GetPayments(limit: $limit, nextToken: $nextToken, dateFrom: $dateFrom, dateTo: $dateTo, currencies: $currencies, type: $type, status: $status) {\n            debitCurrency\n            creditCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      accountId\n      allInRate\n      destinationAmount\n      destinationCurrency\n      destinationMainCurrency\n      entityId\n      errorCode\n      errorMessage\n      fee\n      sourceAmount\n      sourceCurrency\n      sourceMainCurrency\n      userId\n    }\n  }\n"): (typeof documents)["\n  subscription OnQuotePriceReceived {\n    OnQuotePriceReceived {\n      accountId\n      allInRate\n      destinationAmount\n      destinationCurrency\n      destinationMainCurrency\n      entityId\n      errorCode\n      errorMessage\n      fee\n      sourceAmount\n      sourceCurrency\n      sourceMainCurrency\n      userId\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;