/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  AWSDateTime: any;
};

export type Account = {
  __typename?: 'Account';
  accountHolderAddress?: Maybe<AccountAddress>;
  accountHolderName?: Maybe<Scalars['String']>;
  accountIdentification?: Maybe<AccountIdentification>;
  accountIssuerAddress?: Maybe<AccountAddress>;
  accountIssuerName?: Maybe<Scalars['String']>;
  accountName?: Maybe<Scalars['String']>;
  accountStatus?: Maybe<Scalars['String']>;
  availableBalance?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['String']>;
  blockedBalance?: Maybe<Scalars['String']>;
  currency: Scalars['String'];
  currencyType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mainCurrency?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
};

export type AccountAddress = {
  __typename?: 'AccountAddress';
  _id?: Maybe<Scalars['String']>;
  buildingName?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  floor?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type AccountCreateResponse = {
  __typename?: 'AccountCreateResponse';
  code?: Maybe<Scalars['String']>;
  data?: Maybe<Account>;
  message?: Maybe<Scalars['String']>;
};

export type AccountDetails = {
  __typename?: 'AccountDetails';
  accountNumber?: Maybe<Scalars['String']>;
  bic?: Maybe<Scalars['String']>;
  branchCode?: Maybe<Scalars['String']>;
  iban?: Maybe<Scalars['String']>;
  nameOnAccount?: Maybe<Scalars['String']>;
};

export type AccountDetailsInput = {
  accountNumber?: InputMaybe<Scalars['String']>;
  bic?: InputMaybe<Scalars['String']>;
  iban?: InputMaybe<Scalars['String']>;
  nameOnAccount?: InputMaybe<Scalars['String']>;
};

export type AccountIdentification = {
  __typename?: 'AccountIdentification';
  BIC?: Maybe<Scalars['String']>;
  IBAN?: Maybe<Scalars['String']>;
  accountNumber?: Maybe<Scalars['String']>;
  accountRegion?: Maybe<Scalars['String']>;
  bankAddress?: Maybe<AccountAddress>;
  bankCode?: Maybe<Scalars['String']>;
  bankName?: Maybe<Scalars['String']>;
};

export type AccountInput = {
  accountName: Scalars['String'];
  currency: Scalars['String'];
  currencyId: Scalars['String'];
  currencyType: Scalars['String'];
  mainCurrency?: InputMaybe<Scalars['String']>;
  mainCurrencyId?: InputMaybe<Scalars['String']>;
};

export type AccountNameUpdate = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type AccountUpdateResponse = {
  __typename?: 'AccountUpdateResponse';
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type AccountsResponse = {
  __typename?: 'AccountsResponse';
  accounts?: Maybe<Array<Maybe<Account>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type Address = {
  __typename?: 'Address';
  buildingNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  stateOrProvince?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zipOrPostalCode?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  buildingNumber?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  stateOrProvince?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zipOrPostalCode?: InputMaybe<Scalars['String']>;
};

export type Balance = {
  __typename?: 'Balance';
  availableBalance?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['String']>;
  balanceId?: Maybe<Scalars['String']>;
  blockUnblock?: Maybe<Scalars['String']>;
  blockedBalance?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  promiseUnpromise?: Maybe<Scalars['String']>;
  promisedBalance?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type Beneficiary = {
  __typename?: 'Beneficiary';
  accountDetails?: Maybe<AccountDetails>;
  beneficiaryDetails?: Maybe<BeneficiaryDetails>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mainCurrency?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type BeneficiaryDetails = {
  __typename?: 'BeneficiaryDetails';
  address?: Maybe<Address>;
  nameOnAccount?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BeneficiaryDetailsInput = {
  address?: InputMaybe<AddressInput>;
  nameOnAccount?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type BeneficiaryInput = {
  accountDetails?: InputMaybe<AccountDetailsInput>;
  beneficiaryDetails?: InputMaybe<BeneficiaryDetailsInput>;
  currency?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type BeneficiaryResult = {
  __typename?: 'BeneficiaryResult';
  entityId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CreateInternalTransferPaymentResponse = {
  __typename?: 'CreateInternalTransferPaymentResponse';
  EventId: Scalars['String'];
  code?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type CreatePaymentResponse = {
  __typename?: 'CreatePaymentResponse';
  PaymentReference: Scalars['String'];
};

export type Creditor = {
  __typename?: 'Creditor';
  creditorAddress?: Maybe<Residence>;
  creditorCountry?: Maybe<Scalars['String']>;
  creditorName?: Maybe<Scalars['String']>;
};

export type CreditorAgent = {
  __typename?: 'CreditorAgent';
  creditorAgentCountry?: Maybe<Scalars['String']>;
  creditorAgentId: Scalars['String'];
  creditorAgentName?: Maybe<Scalars['String']>;
  intermediaryBank?: Maybe<Scalars['String']>;
  intermediaryBankCountry?: Maybe<Scalars['String']>;
};

export type CryptoAddress = {
  __typename?: 'CryptoAddress';
  _id?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
};

export enum CryptoAlertLevel {
  High = 'high',
  Low = 'low',
  Medium = 'medium',
  Severe = 'severe',
  Unknown = 'unknown'
}

export enum CryptoBalanceStatus {
  Complete = 'complete'
}

export type CryptoBlockChainTransaction = {
  __typename?: 'CryptoBlockChainTransaction';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  confidence?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  decimals?: Maybe<Scalars['Int']>;
  direction?: Maybe<CryptoBlockChainTransactionDirection>;
  id?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  minedTimestamp?: Maybe<Scalars['String']>;
  payment?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  product?: Maybe<CryptoProduct>;
  provider?: Maybe<CryptoProvider>;
  state?: Maybe<Scalars['String']>;
  txHash?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  vendorExternalId?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['String']>;
};

export enum CryptoBlockChainTransactionDirection {
  Incoming = 'incoming',
  Outgoing = 'outgoing'
}

export enum CryptoBlockChainTransactionState {
  Complete = 'complete'
}

export enum CryptoDebitCredit {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export type CryptoFx = {
  __typename?: 'CryptoFX';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  details?: Maybe<CryptoFxDetail>;
  id?: Maybe<Scalars['String']>;
  issuerEntityId?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  sourceMerchantId?: Maybe<Scalars['String']>;
  targetAmount?: Maybe<Scalars['String']>;
  targetCurrency?: Maybe<Scalars['String']>;
  targetMerchantId?: Maybe<Scalars['String']>;
  type?: Maybe<CryptoFxType>;
  vendor?: Maybe<Scalars['String']>;
};

export type CryptoFxDetail = {
  __typename?: 'CryptoFXDetail';
  _id?: Maybe<Scalars['String']>;
  transactionRequestId?: Maybe<Scalars['String']>;
};

export type CryptoFee = {
  __typename?: 'CryptoFee';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  fxId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  issuerEntityId?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchantFeeType?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  vendor?: Maybe<Scalars['String']>;
};

export enum CryptoFxType {
  BalanceTransfer = 'BALANCE_TRANSFER',
  Deposit = 'DEPOSIT'
}

export enum CryptoKytStatus {
  Dismissed = 'dismissed',
  Flagged = 'flagged',
  InReview = 'in_review',
  NoReview = 'no_review',
  Refunded = 'refunded'
}

export type CryptoMerchantBalanceTransaction = {
  __typename?: 'CryptoMerchantBalanceTransaction';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  balance?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  debitCredit?: Maybe<CryptoDebitCredit>;
  issuerEntityId?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchantBalanceTransactionId?: Maybe<Scalars['String']>;
  paymentMethod?: Maybe<CryptoPaymentMethod>;
  paymeroMerchantId?: Maybe<Scalars['String']>;
  status?: Maybe<CryptoBalanceStatus>;
  transactionId?: Maybe<Scalars['String']>;
  transactionType?: Maybe<CryptoTransactionType>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CryptoMerchantWithBalance = {
  __typename?: 'CryptoMerchantWithBalance';
  accountId?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
  balance?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  isAddressPoolEnabled?: Maybe<Scalars['Boolean']>;
  isHidden?: Maybe<Scalars['Boolean']>;
  isSettlementAllowed?: Maybe<Scalars['Boolean']>;
  issuerEntityId?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchantName?: Maybe<Scalars['String']>;
};

export type CryptoPayment = {
  __typename?: 'CryptoPayment';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  address?: Maybe<CryptoAddress>;
  addressExternalId?: Maybe<Scalars['String']>;
  addressId?: Maybe<Scalars['String']>;
  blockchainTransactions?: Maybe<Array<Maybe<CryptoBlockChainTransaction>>>;
  cashierAmount?: Maybe<Scalars['String']>;
  cashierCurrency?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  customSettlement?: Maybe<Scalars['Boolean']>;
  exchangeTransactions?: Maybe<Array<Maybe<CryptoFx>>>;
  externalId?: Maybe<Scalars['String']>;
  feeCoverage?: Maybe<Scalars['Boolean']>;
  fees?: Maybe<Array<Maybe<CryptoFee>>>;
  id?: Maybe<Scalars['String']>;
  invoiceCreated?: Maybe<Scalars['String']>;
  invoiceExpires?: Maybe<Scalars['String']>;
  issuerEntityId?: Maybe<Scalars['String']>;
  kytAlertLevel?: Maybe<CryptoAlertLevel>;
  kytStatus?: Maybe<CryptoKytStatus>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  notifyUrl?: Maybe<Scalars['String']>;
  paidAmount?: Maybe<Scalars['Float']>;
  paidAmountInCashierCurrency?: Maybe<Scalars['Float']>;
  paidAmountInTargetCurrency?: Maybe<Scalars['Float']>;
  provider?: Maybe<Scalars['String']>;
  rates?: Maybe<Array<Maybe<CryptoRate>>>;
  receivingAddress?: Maybe<Scalars['String']>;
  redirectUrl?: Maybe<Scalars['String']>;
  sendingAddress?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  sourceMerchantId?: Maybe<Scalars['String']>;
  status?: Maybe<CryptoPaymentStatus>;
  subType?: Maybe<CryptoPaymentSubType>;
  targetAmount?: Maybe<Scalars['String']>;
  targetCurrency?: Maybe<Scalars['String']>;
  targetMerchantId?: Maybe<Scalars['String']>;
  type?: Maybe<CryptoPaymentType>;
  updatedAt?: Maybe<Scalars['String']>;
  walletId?: Maybe<Scalars['String']>;
};

export enum CryptoPaymentMethod {
  Crypto = 'CRYPTO',
  CryptoDeposit = 'CRYPTO_DEPOSIT',
  CryptoPayment = 'CRYPTO_PAYMENT',
  CryptoPayout = 'CRYPTO_PAYOUT',
  InternalTransfer = 'INTERNAL_TRANSFER'
}

export type CryptoPaymentRealtimeResponse = {
  __typename?: 'CryptoPaymentRealtimeResponse';
  accountId?: Maybe<Scalars['String']>;
  addressExternalId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  externalId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  kytAlertLevel?: Maybe<Scalars['String']>;
  kytStatus?: Maybe<Scalars['String']>;
  receivingAddress?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  subType?: Maybe<Scalars['String']>;
  targetAmount?: Maybe<Scalars['String']>;
  targetCurrency?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export enum CryptoPaymentStatus {
  Completed = 'completed',
  Confirmed = 'confirmed',
  Credited = 'credited',
  Debited = 'debited',
  Expired = 'expired',
  Failed = 'failed',
  Initiated = 'initiated',
  OverPaid = 'overPaid',
  Paid = 'paid',
  Pending = 'pending',
  Refunded = 'refunded',
  UnderPaid = 'underPaid'
}

export enum CryptoPaymentSubType {
  Batch = 'batch',
  Channel = 'channel',
  Invoice = 'invoice'
}

export enum CryptoPaymentType {
  Deposit = 'deposit',
  Payout = 'payout'
}

export enum CryptoProduct {
  Cf = 'cf'
}

export enum CryptoProvider {
  Binancepay = 'binancepay',
  Copper = 'copper',
  Curv = 'curv',
  Fireblocks = 'fireblocks',
  Tatum = 'tatum',
  Trongrid = 'trongrid'
}

export type CryptoRate = {
  __typename?: 'CryptoRate';
  amount?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['String']>;
  rate?: Maybe<Scalars['String']>;
  ticker?: Maybe<Scalars['String']>;
};

export enum CryptoTransactionType {
  Block = 'BLOCK',
  Deposit = 'DEPOSIT',
  DepositReversal = 'DEPOSIT_REVERSAL',
  Fee = 'FEE',
  FeeRefund = 'FEE_REFUND',
  InternalTransferInbound = 'INTERNAL_TRANSFER_INBOUND',
  InternalTransferOutbound = 'INTERNAL_TRANSFER_OUTBOUND',
  NetworkFee = 'NETWORK_FEE',
  NetworkFeeCoverage = 'NETWORK_FEE_COVERAGE',
  NetworkFeeRefund = 'NETWORK_FEE_REFUND',
  Payout = 'PAYOUT',
  PayoutRefund = 'PAYOUT_REFUND',
  Settlement = 'SETTLEMENT',
  SettlementRefund = 'SETTLEMENT_REFUND',
  TopupExternal = 'TOPUP_EXTERNAL',
  TopupPmid = 'TOPUP_PMID',
  TransferExternal = 'TRANSFER_EXTERNAL',
  TransferPmid = 'TRANSFER_PMID',
  Unblock = 'UNBLOCK'
}

export type Debtor = {
  __typename?: 'Debtor';
  debtorAddress?: Maybe<Residence>;
  debtorCountry?: Maybe<Scalars['String']>;
  debtorName?: Maybe<Scalars['String']>;
};

export type DebtorAgent = {
  __typename?: 'DebtorAgent';
  debtorAgentCountry?: Maybe<Scalars['String']>;
  debtorAgentId: Scalars['String'];
  debtorAgentName?: Maybe<Scalars['String']>;
};

export type Entity = {
  __typename?: 'Entity';
  PK: Scalars['String'];
  accountId?: Maybe<Scalars['String']>;
  entityId: Scalars['String'];
  organisationId: Scalars['String'];
  registeredCompanyName?: Maybe<Scalars['String']>;
  tradingName?: Maybe<Scalars['String']>;
  type: EntityType;
};

export type EntityResponse = {
  __typename?: 'EntityResponse';
  entity?: Maybe<Entity>;
};

export enum EntityType {
  Client = 'client'
}

export type EventBridgeResponse = {
  __typename?: 'EventBridgeResponse';
  id: Scalars['String'];
};

export type ExchangePairs = {
  __typename?: 'ExchangePairs';
  buyCurrency: Scalars['String'];
  restrictInCp: Scalars['Boolean'];
};

export type ForeignExchange = {
  __typename?: 'ForeignExchange';
  allInRate?: Maybe<Scalars['String']>;
  buyAmount?: Maybe<Scalars['String']>;
  foreignExchangeTradeId?: Maybe<Scalars['String']>;
  fxProfitAmount?: Maybe<Scalars['String']>;
  fxWithdrawalAmount?: Maybe<Scalars['String']>;
  sellAmount?: Maybe<Scalars['String']>;
  spread?: Maybe<Scalars['String']>;
  tradeReference?: Maybe<Scalars['String']>;
  vendorRate?: Maybe<Scalars['String']>;
};

export type GetCryptoMerchantBalanceTransactionDetailsResponse = {
  __typename?: 'GetCryptoMerchantBalanceTransactionDetailsResponse';
  fee?: Maybe<CryptoFee>;
  id?: Maybe<Scalars['String']>;
  payment?: Maybe<CryptoPayment>;
  receivable?: Maybe<Receivable>;
};

export type GetCryptoMerchantBalanceTransactionsResponse = {
  __typename?: 'GetCryptoMerchantBalanceTransactionsResponse';
  merchantBalanceTransactions?: Maybe<Array<Maybe<CryptoMerchantBalanceTransaction>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type GetCryptoMerchantBalancesResponse = {
  __typename?: 'GetCryptoMerchantBalancesResponse';
  merchants?: Maybe<Array<Maybe<CryptoMerchantWithBalance>>>;
  nextToken?: Maybe<Scalars['String']>;
};

export type GetCryptoPaymentsResponse = {
  __typename?: 'GetCryptoPaymentsResponse';
  nextToken?: Maybe<Scalars['String']>;
  page?: Maybe<Scalars['Int']>;
  payments?: Maybe<Array<Maybe<CryptoPayment>>>;
};

export type GetReceivableDetailsResponse = {
  __typename?: 'GetReceivableDetailsResponse';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchant?: Maybe<CryptoMerchantWithBalance>;
  merchantId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  payment?: Maybe<CryptoPayment>;
  paymentId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type GetReceivablesResponse = {
  __typename?: 'GetReceivablesResponse';
  nextToken?: Maybe<Scalars['String']>;
  receivables?: Maybe<Array<Maybe<Receivable>>>;
};

export type GetStatementRequestsResponse = {
  __typename?: 'GetStatementRequestsResponse';
  nextToken?: Maybe<Scalars['String']>;
  statements?: Maybe<Array<Maybe<StatementRequest>>>;
};

export type InputId = {
  id: Scalars['ID'];
};

export type InternalTransfer = {
  account: Scalars['String'];
  amount: Scalars['Float'];
  currency: Scalars['String'];
  domain: InternalTransferDomain;
  mainCurrency?: InputMaybe<Scalars['String']>;
};

export enum InternalTransferDomain {
  Crypto = 'crypto',
  Pay = 'pay'
}

export type InternalTransferRealtimeResponse = {
  __typename?: 'InternalTransferRealtimeResponse';
  amount?: Maybe<Scalars['Float']>;
  creditorAccountId?: Maybe<Scalars['String']>;
  creditorAccountNumber?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  debtorAccountId?: Maybe<Scalars['String']>;
  debtorAccountNumber?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type InternalTransferRequestInput = {
  source: InternalTransfer;
  target: InternalTransfer;
};

export enum InternalTransferType {
  InternalTransferCryptoPay = 'internal_transfer_crypto_pay',
  InternalTransferPayCrypto = 'internal_transfer_pay_crypto',
  OutboundAssetInternalCryptoCrypto = 'outbound_asset_internal_crypto_crypto',
  OutboundAssetInternalCryptoExchange = 'outbound_asset_internal_crypto_exchange',
  OutboundAssetInternalFiatFiat = 'outbound_asset_internal_fiat_fiat',
  OutboundLiabilityExternalCryptoCrypto = 'outbound_liability_external_crypto_crypto',
  OutboundLiabilityInternalCryptoCrypto = 'outbound_liability_internal_crypto_crypto',
  OutboundLiabilityInternalCryptoFiat = 'outbound_liability_internal_crypto_fiat',
  OutboundLiabilityInternalFiatFiat = 'outbound_liability_internal_fiat_fiat'
}

export type Mutation = {
  __typename?: 'Mutation';
  BeneficiaryCreatedReceived?: Maybe<BeneficiaryResult>;
  BeneficiaryRemovedReceived?: Maybe<BeneficiaryResult>;
  CreateAccount?: Maybe<AccountCreateResponse>;
  CreateBeneficiary?: Maybe<MutationResponse>;
  CreateReceivablesRequestCryptoPayments?: Maybe<EventBridgeResponse>;
  CreateStatementRequestCryptoPayments?: Maybe<EventBridgeResponse>;
  CreateStatementRequestMerchantBalanceTransactions?: Maybe<EventBridgeResponse>;
  CryptoPaymentCreated?: Maybe<CryptoPaymentRealtimeResponse>;
  CryptoPaymentUpdated?: Maybe<CryptoPaymentRealtimeResponse>;
  DeleteAccount?: Maybe<AccountUpdateResponse>;
  InternalTransferCompleted?: Maybe<InternalTransferRealtimeResponse>;
  InternalTransferCreated?: Maybe<InternalTransferRealtimeResponse>;
  InternalTransferFailed?: Maybe<InternalTransferRealtimeResponse>;
  QuotePriceReceived?: Maybe<Quote>;
  RemoveBeneficiary?: Maybe<MutationResponse>;
  RequestExternalPayment?: Maybe<CreatePaymentResponse>;
  RequestInternalTransfer?: Maybe<CreateInternalTransferPaymentResponse>;
  RequestQuote?: Maybe<MutationResponse>;
  StatementRequestUpdated?: Maybe<StatementRequestRealtimeResponse>;
  UpdateAccountName?: Maybe<AccountUpdateResponse>;
};


export type MutationBeneficiaryCreatedReceivedArgs = {
  entityId: Scalars['String'];
  id: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationBeneficiaryRemovedReceivedArgs = {
  entityId: Scalars['String'];
  id: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateAccountArgs = {
  account?: InputMaybe<AccountInput>;
};


export type MutationCreateBeneficiaryArgs = {
  beneficiary?: InputMaybe<BeneficiaryInput>;
};


export type MutationCreateReceivablesRequestCryptoPaymentsArgs = {
  amount: Scalars['String'];
  company: Scalars['String'];
  currency: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  merchantId: Scalars['String'];
  paymentId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStatementRequestCryptoPaymentsArgs = {
  dateFrom: Scalars['String'];
  dateTo: Scalars['String'];
  fileName?: InputMaybe<Scalars['String']>;
  fileType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
};


export type MutationCreateStatementRequestMerchantBalanceTransactionsArgs = {
  dateFrom: Scalars['String'];
  dateTo: Scalars['String'];
  fileName?: InputMaybe<Scalars['String']>;
  fileType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  merchantId: Scalars['String'];
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
};


export type MutationCryptoPaymentCreatedArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  addressExternalId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  kytAlertLevel?: InputMaybe<Scalars['String']>;
  kytStatus?: InputMaybe<Scalars['String']>;
  receivingAddress?: InputMaybe<Scalars['String']>;
  sourceAmount?: InputMaybe<Scalars['String']>;
  sourceCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  subType?: InputMaybe<Scalars['String']>;
  targetAmount?: InputMaybe<Scalars['String']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationCryptoPaymentUpdatedArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  addressExternalId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['String']>;
  externalId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  kytAlertLevel?: InputMaybe<Scalars['String']>;
  kytStatus?: InputMaybe<Scalars['String']>;
  receivingAddress?: InputMaybe<Scalars['String']>;
  sourceAmount?: InputMaybe<Scalars['String']>;
  sourceCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  subType?: InputMaybe<Scalars['String']>;
  targetAmount?: InputMaybe<Scalars['String']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type MutationDeleteAccountArgs = {
  account?: InputMaybe<InputId>;
};


export type MutationInternalTransferCompletedArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  creditorAccountId?: InputMaybe<Scalars['String']>;
  creditorAccountNumber?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  debtorAccountId?: InputMaybe<Scalars['String']>;
  debtorAccountNumber?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationInternalTransferCreatedArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  creditorAccountId?: InputMaybe<Scalars['String']>;
  creditorAccountNumber?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  debtorAccountId?: InputMaybe<Scalars['String']>;
  debtorAccountNumber?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationInternalTransferFailedArgs = {
  amount?: InputMaybe<Scalars['Float']>;
  creditorAccountId?: InputMaybe<Scalars['String']>;
  creditorAccountNumber?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  debtorAccountId?: InputMaybe<Scalars['String']>;
  debtorAccountNumber?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type MutationQuotePriceReceivedArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  allInRate?: InputMaybe<Scalars['String']>;
  destinationAmount?: InputMaybe<Scalars['String']>;
  destinationCurrency?: InputMaybe<Scalars['String']>;
  destinationMainCurrency?: InputMaybe<Scalars['String']>;
  entityId: Scalars['String'];
  errorCode?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  fee?: InputMaybe<Scalars['String']>;
  sourceAmount?: InputMaybe<Scalars['String']>;
  sourceCurrency?: InputMaybe<Scalars['String']>;
  sourceMainCurrency?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationRemoveBeneficiaryArgs = {
  beneficiary?: InputMaybe<InputId>;
};


export type MutationRequestExternalPaymentArgs = {
  payment?: InputMaybe<PaymentRequestInput>;
};


export type MutationRequestInternalTransferArgs = {
  payment?: InputMaybe<InternalTransferRequestInput>;
};


export type MutationRequestQuoteArgs = {
  quote?: InputMaybe<QuoteRequestInput>;
};


export type MutationStatementRequestUpdatedArgs = {
  createdAt?: InputMaybe<Scalars['String']>;
  fileName?: InputMaybe<Scalars['String']>;
  fileType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  requestor?: InputMaybe<Scalars['String']>;
  requestorAccountId?: InputMaybe<Scalars['String']>;
  requestorUserId?: InputMaybe<Scalars['String']>;
  resource?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateAccountNameArgs = {
  account?: InputMaybe<AccountNameUpdate>;
};

export type MutationResponse = {
  __typename?: 'MutationResponse';
  EventId: Scalars['String'];
};

export type Payment = {
  __typename?: 'Payment';
  _id: Scalars['ID'];
  accountBalanceId: Scalars['String'];
  accountId: Scalars['String'];
  balances?: Maybe<Array<Maybe<Balance>>>;
  beneficiaryId?: Maybe<Scalars['String']>;
  chargeBearer: Scalars['String'];
  complianceCheckResult?: Maybe<Scalars['String']>;
  created?: Maybe<User>;
  createdAt: Scalars['AWSDateTime'];
  creditAmount?: Maybe<Scalars['Float']>;
  creditCurrency?: Maybe<Scalars['String']>;
  creditor?: Maybe<Creditor>;
  creditorAccount?: Maybe<Scalars['String']>;
  creditorAccountType: Scalars['String'];
  creditorAgent?: Maybe<CreditorAgent>;
  debitAmount?: Maybe<Scalars['Float']>;
  debitAmountAfterFees?: Maybe<Scalars['Float']>;
  debitCurrency?: Maybe<Scalars['String']>;
  debtor?: Maybe<Debtor>;
  debtorAccount?: Maybe<Scalars['String']>;
  debtorAccountType: Scalars['String'];
  debtorAgent?: Maybe<DebtorAgent>;
  endToEndReference: Scalars['String'];
  errorQueueRemarks?: Maybe<Scalars['String']>;
  exitStatusCode?: Maybe<Scalars['String']>;
  fees?: Maybe<PaymentFee>;
  foreignExchange?: Maybe<ForeignExchange>;
  functionState?: Maybe<Scalars['String']>;
  instructionCreatedDate?: Maybe<Scalars['String']>;
  instructionPriority: Scalars['String'];
  instructionReceivedDate: Scalars['AWSDateTime'];
  instructionReference: Scalars['String'];
  internalPayment?: Maybe<Scalars['Boolean']>;
  isDuplicate?: Maybe<Scalars['Boolean']>;
  isOutbound: Scalars['Boolean'];
  isReturn?: Maybe<Scalars['Boolean']>;
  isTreasury?: Maybe<Scalars['Boolean']>;
  mainCreditCurrency?: Maybe<Scalars['String']>;
  mainDebitCurrency?: Maybe<Scalars['String']>;
  messageState: Scalars['String'];
  messageType: Scalars['String'];
  originalInstructedAmount: Scalars['Float'];
  ownerEntityId: Scalars['String'];
  paymentRoutingChannel?: Maybe<Scalars['String']>;
  processFlow: Scalars['String'];
  reference?: Maybe<Reference>;
  remittanceInformation: Scalars['String'];
  requestSource?: Maybe<Scalars['String']>;
  requestedValueDate: Scalars['String'];
  settlementChannel?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  transactionReference: Scalars['String'];
  uetr: Scalars['String'];
  updated?: Maybe<User>;
  updatedAt: Scalars['AWSDateTime'];
  valueDate: Scalars['AWSDateTime'];
  vendorAccountId?: Maybe<Scalars['String']>;
  vendorBalanceId?: Maybe<Scalars['String']>;
};

export type PaymentFee = {
  __typename?: 'PaymentFee';
  actualLiftingFee: Scalars['Float'];
  liftingFeeAmount: Scalars['Float'];
  liftingFeeCurrency: Scalars['String'];
  liftingFeeMethod: Scalars['String'];
  pricingProfileId: Scalars['String'];
};

export type PaymentRequestInput = {
  accountId: Scalars['String'];
  beneficiaryId?: InputMaybe<Scalars['String']>;
  creditAmount: Scalars['String'];
  creditCurrency: Scalars['String'];
  creditorAccountId?: InputMaybe<Scalars['String']>;
  debitAmount: Scalars['String'];
  debitCurrency: Scalars['String'];
  remittanceInformation?: InputMaybe<Scalars['String']>;
};

export enum PaymentType {
  In = 'IN',
  Out = 'OUT'
}

export type Query = {
  __typename?: 'Query';
  AccountsFullTextSearch?: Maybe<Array<Maybe<Account>>>;
  BeneficiaryFullTextSearch?: Maybe<Array<Maybe<Beneficiary>>>;
  GetAccountById?: Maybe<Account>;
  GetBeneficiaries?: Maybe<BeneficiaryResponse>;
  GetBeneficiaryById?: Maybe<Beneficiary>;
  GetClientAccounts?: Maybe<AccountsResponse>;
  GetCryptoMerchantBalanceTransactionDetails?: Maybe<GetCryptoMerchantBalanceTransactionDetailsResponse>;
  GetCryptoMerchantBalanceTransactions?: Maybe<GetCryptoMerchantBalanceTransactionsResponse>;
  GetCryptoMerchantBalances?: Maybe<GetCryptoMerchantBalancesResponse>;
  GetCryptoPayment?: Maybe<CryptoPayment>;
  GetCryptoPayments?: Maybe<GetCryptoPaymentsResponse>;
  GetCurrencyExchangePairs?: Maybe<Array<Maybe<ExchangePairs>>>;
  GetEntities?: Maybe<Array<Maybe<Entity>>>;
  GetPaymentById?: Maybe<Payment>;
  GetPayments?: Maybe<Array<Maybe<Payment>>>;
  GetReceivableDetails?: Maybe<GetReceivableDetailsResponse>;
  GetReceivables?: Maybe<GetReceivablesResponse>;
  GetStatementRequest?: Maybe<StatementRequest>;
  GetStatementRequests?: Maybe<GetStatementRequestsResponse>;
  GetStatementRequestsCryptoPayments?: Maybe<GetStatementRequestsResponse>;
  GetStatementRequestsMerchantBalanceTransactions?: Maybe<GetStatementRequestsResponse>;
  PaymentsFullTextSearch?: Maybe<Array<Maybe<Payment>>>;
  SignStatementRequest?: Maybe<SignStatementRequestResponse>;
};


export type QueryAccountsFullTextSearchArgs = {
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text: Scalars['String'];
};


export type QueryBeneficiaryFullTextSearchArgs = {
  accountNumber?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  nameOnAccount?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  text: Scalars['String'];
};


export type QueryGetAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetBeneficiariesArgs = {
  accountNumber?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  nameOnAccount?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGetBeneficiaryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetClientAccountsArgs = {
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  productIds?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryGetCryptoMerchantBalanceTransactionDetailsArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetCryptoMerchantBalanceTransactionsArgs = {
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  paymeroMerchantId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  transactionType?: InputMaybe<Scalars['String']>;
};


export type QueryGetCryptoMerchantBalancesArgs = {
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  merchantId?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
};


export type QueryGetCryptoPaymentArgs = {
  id: Scalars['String'];
};


export type QueryGetCryptoPaymentsArgs = {
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  kytAlertLevel?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  searchMinScore?: InputMaybe<Scalars['Float']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  sourceCurrency?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  subType?: InputMaybe<Scalars['String']>;
  targetCurrency?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QueryGetCurrencyExchangePairsArgs = {
  sellCurrency: Scalars['String'];
};


export type QueryGetPaymentByIdArgs = {
  id: Scalars['String'];
};


export type QueryGetPaymentsArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  conversion?: InputMaybe<Scalars['Boolean']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  debitCurrencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PaymentType>;
};


export type QueryGetReceivableDetailsArgs = {
  id: Scalars['String'];
};


export type QueryGetReceivablesArgs = {
  accountId?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  mainCurrency?: InputMaybe<Scalars['String']>;
  merchantId?: InputMaybe<Scalars['String']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type QueryGetStatementRequestArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryGetStatementRequestsArgs = {
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetStatementRequestsCryptoPaymentsArgs = {
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryGetStatementRequestsMerchantBalanceTransactionsArgs = {
  id?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};


export type QueryPaymentsFullTextSearchArgs = {
  conversion?: InputMaybe<Scalars['Boolean']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  debitCurrencies?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  text: Scalars['String'];
  type?: InputMaybe<PaymentType>;
};


export type QuerySignStatementRequestArgs = {
  id: Scalars['String'];
};

export type QueryGetCryptoSortBy = {
  __typename?: 'QueryGetCryptoSortBy';
  _id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
};

export enum QueryGetSort {
  Asc = 'asc',
  Desc = 'desc'
}

export type Quote = {
  __typename?: 'Quote';
  accountId?: Maybe<Scalars['String']>;
  allInRate?: Maybe<Scalars['String']>;
  destinationAmount?: Maybe<Scalars['String']>;
  destinationCurrency?: Maybe<Scalars['String']>;
  destinationMainCurrency?: Maybe<Scalars['String']>;
  entityId?: Maybe<Scalars['String']>;
  errorCode?: Maybe<QuoteErrorCode>;
  errorMessage?: Maybe<Scalars['String']>;
  fee?: Maybe<Scalars['String']>;
  sourceAmount?: Maybe<Scalars['String']>;
  sourceCurrency?: Maybe<Scalars['String']>;
  sourceMainCurrency?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export enum QuoteErrorCode {
  InsufficientFundException = 'InsufficientFundException',
  InternalServerErrorException = 'InternalServerErrorException',
  NotImplementedException = 'NotImplementedException',
  PayloadErrorException = 'PayloadErrorException',
  PricingNotFoundException = 'PricingNotFoundException'
}

export type QuoteRequestInput = {
  accountId: Scalars['String'];
  destinationAmount?: InputMaybe<Scalars['String']>;
  destinationCurrency: Scalars['String'];
  destinationMainCurrency?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  sourceAmount?: InputMaybe<Scalars['String']>;
  sourceCurrency: Scalars['String'];
  sourceMainCurrency?: InputMaybe<Scalars['String']>;
};

export type Receivable = {
  __typename?: 'Receivable';
  _id?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  mainCurrency?: Maybe<Scalars['String']>;
  merchantId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  paymentId?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Reference = {
  __typename?: 'Reference';
  creditorAccountId?: Maybe<Scalars['String']>;
  creditorCurrencyType?: Maybe<Scalars['String']>;
  debtorCurrencyType: Scalars['String'];
  externalReference?: Maybe<Scalars['String']>;
  settlementVendorId: Scalars['ID'];
  txHash?: Maybe<Scalars['String']>;
};

export type Residence = {
  __typename?: 'Residence';
  buildingNumber?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type SignStatementRequestResponse = {
  __typename?: 'SignStatementRequestResponse';
  signed: Scalars['String'];
};

export type StatementRequest = {
  __typename?: 'StatementRequest';
  createdAt?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  fileType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  requestorAccountId?: Maybe<Scalars['String']>;
  requestorUserId?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type StatementRequestRealtimeResponse = {
  __typename?: 'StatementRequestRealtimeResponse';
  createdAt?: Maybe<Scalars['String']>;
  fileName?: Maybe<Scalars['String']>;
  fileType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  requestor?: Maybe<Scalars['String']>;
  requestorAccountId?: Maybe<Scalars['String']>;
  requestorUserId?: Maybe<Scalars['String']>;
  resource?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  OnBeneficiaryCreatedReceived?: Maybe<BeneficiaryResult>;
  OnBeneficiaryRemovedReceived?: Maybe<BeneficiaryResult>;
  OnCryptoPaymentCreated?: Maybe<CryptoPaymentRealtimeResponse>;
  OnCryptoPaymentUpdated?: Maybe<CryptoPaymentRealtimeResponse>;
  OnInternalTransferCompleted?: Maybe<InternalTransferRealtimeResponse>;
  OnInternalTransferCreated?: Maybe<InternalTransferRealtimeResponse>;
  OnInternalTransferFailed?: Maybe<InternalTransferRealtimeResponse>;
  OnQuotePriceReceived?: Maybe<Quote>;
  OnStatementRequestCryptoPaymentsUpdated?: Maybe<StatementRequestRealtimeResponse>;
  OnStatementRequestMBTUpdated?: Maybe<StatementRequestRealtimeResponse>;
  OnStatementRequestUpdated?: Maybe<StatementRequestRealtimeResponse>;
};


export type SubscriptionOnCryptoPaymentCreatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnCryptoPaymentUpdatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnInternalTransferCompletedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnInternalTransferCreatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnInternalTransferFailedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnStatementRequestCryptoPaymentsUpdatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnStatementRequestMbtUpdatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type SubscriptionOnStatementRequestUpdatedArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  source: Scalars['String'];
  userId: Scalars['String'];
};

export type BeneficiaryResponse = {
  __typename?: 'beneficiaryResponse';
  beneficiaries?: Maybe<Array<Maybe<Beneficiary>>>;
  count?: Maybe<Scalars['Int']>;
  nextToken?: Maybe<Scalars['String']>;
};

export type TypeId = {
  __typename?: 'typeID';
  id: Scalars['ID'];
};

export type RequestQuoteMutationVariables = Exact<{
  quote?: InputMaybe<QuoteRequestInput>;
}>;


export type RequestQuoteMutation = { __typename?: 'Mutation', RequestQuote?: { __typename?: 'MutationResponse', EventId: string } | null };

export type GetClientAccountsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
}>;


export type GetClientAccountsQuery = { __typename?: 'Query', GetClientAccounts?: { __typename?: 'AccountsResponse', accounts?: Array<{ __typename?: 'Account', accountName?: string | null, availableBalance?: string | null, currency: string, mainCurrency?: string | null, currencyType?: string | null, id: string, accountIdentification?: { __typename?: 'AccountIdentification', accountNumber?: string | null, IBAN?: string | null } | null } | null> | null } | null };

export type GetAccountByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetAccountByIdQuery = { __typename?: 'Query', GetAccountById?: { __typename?: 'Account', accountName?: string | null, availableBalance?: string | null, currency: string, mainCurrency?: string | null, currencyType?: string | null, id: string, accountIdentification?: { __typename?: 'AccountIdentification', accountNumber?: string | null, IBAN?: string | null } | null } | null };

export type GetCurrencyExchangePairsQueryVariables = Exact<{
  sellCurrency: Scalars['String'];
}>;


export type GetCurrencyExchangePairsQuery = { __typename?: 'Query', GetCurrencyExchangePairs?: Array<{ __typename?: 'ExchangePairs', buyCurrency: string, restrictInCp: boolean } | null> | null };

export type GetPaymentsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  debitCurrencies?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  type?: InputMaybe<PaymentType>;
  status?: InputMaybe<Scalars['String']>;
  conversion?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetPaymentsQuery = { __typename?: 'Query', GetPayments?: Array<{ __typename?: 'Payment', _id: string, debitAmount?: number | null, debitCurrency?: string | null, creditAmount?: number | null, isOutbound: boolean, status?: string | null, transactionReference: string, creditCurrency?: string | null, mainCreditCurrency?: string | null, mainDebitCurrency?: string | null, creditor?: { __typename?: 'Creditor', creditorName?: string | null } | null } | null> | null };

export type PaymentsFullTextSearchQueryVariables = Exact<{
  text: Scalars['String'];
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  debitCurrencies?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  type?: InputMaybe<PaymentType>;
  status?: InputMaybe<Scalars['String']>;
  conversion?: InputMaybe<Scalars['Boolean']>;
}>;


export type PaymentsFullTextSearchQuery = { __typename?: 'Query', PaymentsFullTextSearch?: Array<{ __typename?: 'Payment', _id: string, debitAmount?: number | null, debitCurrency?: string | null, creditAmount?: number | null, isOutbound: boolean, status?: string | null, transactionReference: string, creditCurrency?: string | null, mainCreditCurrency?: string | null, mainDebitCurrency?: string | null, creditor?: { __typename?: 'Creditor', creditorName?: string | null } | null } | null> | null };

export type GetPaymentByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetPaymentByIdQuery = { __typename?: 'Query', GetPaymentById?: { __typename?: 'Payment', _id: string, createdAt: any, creditAmount?: number | null, creditCurrency?: string | null, creditorAccount?: string | null, debtorAccount?: string | null, debitAmount?: number | null, debitCurrency?: string | null, mainCreditCurrency?: string | null, mainDebitCurrency?: string | null, transactionReference: string, processFlow: string, status?: string | null, created?: { __typename?: 'User', firstName: string, lastName: string } | null, creditor?: { __typename?: 'Creditor', creditorName?: string | null } | null, debtor?: { __typename?: 'Debtor', debtorName?: string | null } | null, reference?: { __typename?: 'Reference', debtorCurrencyType: string, creditorCurrencyType?: string | null } | null, foreignExchange?: { __typename?: 'ForeignExchange', allInRate?: string | null } | null } | null };

export type GetPaymentsCurrenciesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  nextToken?: InputMaybe<Scalars['String']>;
  dateFrom?: InputMaybe<Scalars['String']>;
  dateTo?: InputMaybe<Scalars['String']>;
  currencies?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
  type?: InputMaybe<PaymentType>;
  status?: InputMaybe<Scalars['String']>;
}>;


export type GetPaymentsCurrenciesQuery = { __typename?: 'Query', GetPayments?: Array<{ __typename?: 'Payment', debitCurrency?: string | null, creditCurrency?: string | null } | null> | null };

export type OnQuotePriceReceivedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnQuotePriceReceivedSubscription = { __typename?: 'Subscription', OnQuotePriceReceived?: { __typename?: 'Quote', accountId?: string | null, allInRate?: string | null, destinationAmount?: string | null, destinationCurrency?: string | null, destinationMainCurrency?: string | null, entityId?: string | null, errorCode?: QuoteErrorCode | null, errorMessage?: string | null, fee?: string | null, sourceAmount?: string | null, sourceCurrency?: string | null, sourceMainCurrency?: string | null, userId?: string | null } | null };


export const RequestQuoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestQuote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"quote"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QuoteRequestInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"RequestQuote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"quote"},"value":{"kind":"Variable","name":{"kind":"Name","value":"quote"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"EventId"}}]}}]}}]} as unknown as DocumentNode<RequestQuoteMutation, RequestQuoteMutationVariables>;
export const GetClientAccountsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetClientAccounts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetClientAccounts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountIdentification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}},{"kind":"Field","name":{"kind":"Name","value":"IBAN"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"availableBalance"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"mainCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"currencyType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<GetClientAccountsQuery, GetClientAccountsQueryVariables>;
export const GetAccountByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAccountById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetAccountById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountIdentification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountNumber"}},{"kind":"Field","name":{"kind":"Name","value":"IBAN"}}]}},{"kind":"Field","name":{"kind":"Name","value":"accountName"}},{"kind":"Field","name":{"kind":"Name","value":"availableBalance"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"mainCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"currencyType"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<GetAccountByIdQuery, GetAccountByIdQueryVariables>;
export const GetCurrencyExchangePairsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCurrencyExchangePairs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sellCurrency"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetCurrencyExchangePairs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sellCurrency"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sellCurrency"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"buyCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"restrictInCp"}}]}}]}}]} as unknown as DocumentNode<GetCurrencyExchangePairsQuery, GetCurrencyExchangePairsQueryVariables>;
export const GetPaymentsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPayments"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"debitCurrencies"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPayments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"currencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}}},{"kind":"Argument","name":{"kind":"Name","value":"debitCurrencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"debitCurrencies"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"conversion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"debitAmount"}},{"kind":"Field","name":{"kind":"Name","value":"debitCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"creditAmount"}},{"kind":"Field","name":{"kind":"Name","value":"creditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creditorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOutbound"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"transactionReference"}},{"kind":"Field","name":{"kind":"Name","value":"creditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainCreditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainDebitCurrency"}}]}}]}}]} as unknown as DocumentNode<GetPaymentsQuery, GetPaymentsQueryVariables>;
export const PaymentsFullTextSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PaymentsFullTextSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"debitCurrencies"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conversion"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"PaymentsFullTextSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"currencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}}},{"kind":"Argument","name":{"kind":"Name","value":"debitCurrencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"debitCurrencies"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}},{"kind":"Argument","name":{"kind":"Name","value":"conversion"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conversion"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"debitAmount"}},{"kind":"Field","name":{"kind":"Name","value":"debitCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"creditAmount"}},{"kind":"Field","name":{"kind":"Name","value":"creditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creditorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isOutbound"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"transactionReference"}},{"kind":"Field","name":{"kind":"Name","value":"creditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainCreditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainDebitCurrency"}}]}}]}}]} as unknown as DocumentNode<PaymentsFullTextSearchQuery, PaymentsFullTextSearchQueryVariables>;
export const GetPaymentByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPaymentById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPaymentById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"creditAmount"}},{"kind":"Field","name":{"kind":"Name","value":"creditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"creditorAccount"}},{"kind":"Field","name":{"kind":"Name","value":"debtorAccount"}},{"kind":"Field","name":{"kind":"Name","value":"debitAmount"}},{"kind":"Field","name":{"kind":"Name","value":"debitCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainCreditCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"mainDebitCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"created"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"creditor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"creditorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"debtor"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debtorName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reference"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debtorCurrencyType"}},{"kind":"Field","name":{"kind":"Name","value":"creditorCurrencyType"}}]}},{"kind":"Field","name":{"kind":"Name","value":"foreignExchange"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allInRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"transactionReference"}},{"kind":"Field","name":{"kind":"Name","value":"processFlow"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetPaymentByIdQuery, GetPaymentByIdQueryVariables>;
export const GetPaymentsCurrenciesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getPaymentsCurrencies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GetPayments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"nextToken"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nextToken"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateFrom"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateFrom"}}},{"kind":"Argument","name":{"kind":"Name","value":"dateTo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"dateTo"}}},{"kind":"Argument","name":{"kind":"Name","value":"currencies"},"value":{"kind":"Variable","name":{"kind":"Name","value":"currencies"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"debitCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"creditCurrency"}}]}}]}}]} as unknown as DocumentNode<GetPaymentsCurrenciesQuery, GetPaymentsCurrenciesQueryVariables>;
export const OnQuotePriceReceivedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"OnQuotePriceReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"OnQuotePriceReceived"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountId"}},{"kind":"Field","name":{"kind":"Name","value":"allInRate"}},{"kind":"Field","name":{"kind":"Name","value":"destinationAmount"}},{"kind":"Field","name":{"kind":"Name","value":"destinationCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"destinationMainCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"entityId"}},{"kind":"Field","name":{"kind":"Name","value":"errorCode"}},{"kind":"Field","name":{"kind":"Name","value":"errorMessage"}},{"kind":"Field","name":{"kind":"Name","value":"fee"}},{"kind":"Field","name":{"kind":"Name","value":"sourceAmount"}},{"kind":"Field","name":{"kind":"Name","value":"sourceCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"sourceMainCurrency"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode<OnQuotePriceReceivedSubscription, OnQuotePriceReceivedSubscriptionVariables>;