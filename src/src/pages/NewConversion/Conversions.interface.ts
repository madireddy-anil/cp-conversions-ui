export type Maybe<T> = T | null

export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Account = {
  __typename?: 'Account'
  accountIdentification?: Maybe<AccountIdentification>
  accountName?: Maybe<Scalars['String']>
  accountStatus?: Maybe<Scalars['String']>
  balance?: Scalars['String']
  currency?: Scalars['String']
  id?: Scalars['ID']
}

export type AccountIdentification = {
  __typename?: 'AccountIdentification'
  BIC?: Maybe<Scalars['String']>
  IBAN?: Maybe<Scalars['String']>
  accountNumber: Scalars['String']
  accountRegion?: Maybe<Scalars['String']>
  bankCode?: Maybe<Scalars['String']>
}

export type CurrencyType = {
  currency: 'fiat' | 'crypto'
}

export enum ProcessFlow {
  FiatToFiat = 'fiat-fiat',
  FiatToCrypto = 'fiat-crypto',
  CryptoToCrypto = 'fiat-fiat',
  CryptoToFiat = 'crypto-fiat',
}
