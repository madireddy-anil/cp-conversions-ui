export enum TabNameEnum {
  Payments = 'payments',
  Beneficiaries = 'beneficiaries',
}

export enum ProvidedByEnum {
  PayPerformLtd = 'Pay Perform Ltd, FCA Authorised Payment Institution',
  PayPerformOU = 'Pay Perform OÜ, Estonian FIU licensed Virtual Currency Provider',
}

export enum IssuerEntityIdsEnum {
  PayPerformLtd = 'b3dd7584-2656-47f9-ad3f-a54050ef46fa',
  PayPerformOU = 'adf5d835-ffe8-46dd-bc5e-16e9320426d0',
}

export enum IssuerEntityAddressEnum {
  PayPerformLtd = '44, RCBC Plaza, Ipswich, IP9 2EP, GB',
  PayPerformOU = '4, Keemia, Tallinn, EE, 10616, EE',
}

export enum PaymentProcessFlowEnum {
  FiatToFiat = 'outbound_liability_external_fiat_fiat',
  CryptoToCrypto = 'outbound_liability_external_crypto_crypto',
}

export enum TimeFormatEnum {
  Format01 = 'YYYY-MM-DD hh:mm',
  Format02 = 'DD/MM/YYYY hh:mm:ss A',
  Format03 = 'DD/MM/YYYY hh:mm:ss',
  Format04 = 'DD/MM/YYYY',
}

export enum PaymentType {
  In = 'IN',
  Out = 'OUT',
}

export enum PaymentTypeEnum {
  In = 'Payment in',
  Out = 'Payment out',
}

export enum PaymentFlowEnum {
  Fiat = 'fiat',
  Crypto = 'crypto',
}

export enum ProductId {
  CorporateAccount = 'fee1b2fb-4f1d-46e2-9ca3-7ec67f4727c9',
  DigitalAssetTrading = '682903be-cee9-4794-b28a-f8b8f154cb55',
  PooledAccount = '29c0e2fc-e7dc-4c13-bae2-3ca9809e1cf0',
  CryptoCommerce = '704fb8be-dcef-4c14-b715-e2df6e8b49e2',
  GlobalPayments = '8b9cc5f6-ac88-4876-a258-460c0892ccec',
  ExoticReceivables = '4a6933e6-ee05-4a37-9bb5-776f72d681e8',
  DigitalAssetVault = '767627f3-b72f-4e6e-a28b-192c1d1014fa',
  Yield = '38390091-55c2-42c8-a5c6-8a9db066aab0',
}
