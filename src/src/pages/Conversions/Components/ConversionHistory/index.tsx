import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Text, Button, Cards, Spacer, PageWrapper, PageHeader, HeaderContent, Spin } from '@payconstruct/design-system'
import { Status } from '../Status/Status'
import { DownloadSummary } from './DownloadSummary'
import { ApproversText } from './ApproversText'
import { Currency } from '@payconstruct/fe-utils/dist/Hooks/useCurrencies'
import { currencyFormatter, formatDateAndTime, validateStrings } from 'helpers/customHelpers/customHelper'
import { ProvidedByEnum, TimeFormatEnum } from 'pages/Conversions/enums'
import { ConversionsContext } from 'context/Provider'
import { useQuery } from '@apollo/client'
import { getPaymentById } from 'state/contextProviders/apollo/queries/payments'
import { Payment } from '__generated__/graphql'
import { Helpers } from '@payconstruct/fe-utils'

import Styles from '../Style.module.css'
import { SummaryListProps } from 'pages/Conversions/Conversions.interface'

const { fractionFormat } = Helpers

const InitialSummaryList = {
  label: '',
  value: '',
  hidden: true,
}

type ConversionHistoryProps = {
  currencies: Currency[]
}

const ConversionHistory: React.FC<ConversionHistoryProps> = ({ currencies }) => {
  const { id: paymentId } = useParams()
  const {
    state: { timeZone },
  } = useContext(ConversionsContext)

  const [downloadPDF, setDownloadPDF] = useState<boolean>(false)
  const [payment, setPayment] = useState<Partial<Payment>>({})
  const {
    createdAt,
    transactionReference,
    debitAmount,
    debitCurrency,
    debtorAccount,
    creditAmount,
    creditCurrency,
    creditorAccount,
    mainCreditCurrency,
    mainDebitCurrency,
    reference,
    creditor,
    debtor,
    status,
    foreignExchange,
  } = payment as Payment
  const countryPartyName =
    debitCurrency && creditCurrency ? `${debitCurrency} to ${creditCurrency} conversion` : 'Conversion'
  const firstName = payment?.created?.firstName
  const lastName = payment?.created?.lastName

  const { loading: paymentLoading } = useQuery(getPaymentById, {
    variables: { id: paymentId ?? '' },
    onCompleted: (payment: { GetPaymentById: Payment }) => {
      setPayment(payment?.GetPaymentById ?? {})
    },
  })

  const getDebitCurrencyDecimal = currencies.find((currency: Currency) => debitCurrency === currency?.code)
  const getCreditCurrencyDecimal = currencies.find((currency: Currency) => creditCurrency === currency?.code)

  const conversionDetails = {
    'Sell Currency': validateStrings(currencyFormatter(currencies, debitCurrency ?? '', mainDebitCurrency ?? '')),
    'Buy currency': creditCurrency,
    'Sell amount': validateStrings(
      fractionFormat(
        Number(debitAmount ?? 0),
        parseInt(getDebitCurrencyDecimal?.decimals ?? '0')
        // parseInt(getDebitCurrencyDecimal?.decimals ?? "0")
      ),
      currencyFormatter(currencies, debitCurrency ?? '', mainDebitCurrency ?? '')
    ),
    'Buy amount': validateStrings(
      fractionFormat(
        Number(creditAmount ?? 0),
        parseInt(getCreditCurrencyDecimal?.decimals ?? '0')
        // parseInt(getCreditCurrencyDecimal?.decimals ?? "0")
      ),
      currencyFormatter(currencies, creditCurrency ?? '', mainCreditCurrency ?? '')
    ),
    Rate: validateStrings(foreignExchange?.allInRate),
    'Transaction reference': validateStrings(transactionReference),

    'Created on': createdAt ? formatDateAndTime(createdAt, timeZone, TimeFormatEnum.Format04) : '',
    'Created by': validateStrings(firstName, lastName),
  } as { [key: string]: string | undefined }

  const sellAccountDetails = {
    [reference?.debtorCurrencyType === 'fiat' ? 'Account' : 'Wallet address']: validateStrings(debtorAccount),
    'Account name': validateStrings(debtor?.debtorName),
    'Provided by':
      reference?.debtorCurrencyType === 'fiat' ? ProvidedByEnum.PayPerformLtd : ProvidedByEnum.PayPerformOU,
  }

  const buyAccountDetails = {
    [reference?.creditorCurrencyType === 'fiat' ? 'Account' : 'Wallet address']: validateStrings(creditorAccount),
    Name: validateStrings(creditor?.creditorName),
    'Provided by':
      reference?.creditorCurrencyType === 'fiat' ? ProvidedByEnum.PayPerformLtd : ProvidedByEnum.PayPerformOU,
  }

  return (
    <PageWrapper>
      <Spin loading={paymentLoading}>
        <PageHeader>
          <HeaderContent.LeftSide>
            <Text size="xxlarge" weight="bold" style={{ lineHeight: '120%' }}>
              {countryPartyName}
            </Text>
          </HeaderContent.LeftSide>
          <HeaderContent.RightSide>
            <Button
              type="link"
              icon={{ name: 'download' }}
              label="Download confirmation"
              style={{ width: '170px' }}
              onClick={() => setDownloadPDF(true)}
              size="large"
            />
          </HeaderContent.RightSide>
        </PageHeader>

        <div className={Styles['pay_subHeader']}>
          <PageHeader>
            <HeaderContent.LeftSide>
              <ApproversText status="" />
            </HeaderContent.LeftSide>
            <HeaderContent.RightSide>
              <Status size="small" status={status ?? 'pending'} />
            </HeaderContent.RightSide>
          </PageHeader>
        </div>

        <Cards.SummaryCard
          key="1"
          style={{ borderRadius: '10px' }}
          columns={12}
          title="Conversion details"
          showCopyIcon
          summaryList={
            (conversionDetails
              ? Object.entries(conversionDetails).map(([label, value]) => {
                  return value
                    ? {
                        label: label,
                        value: value,
                        hidden: !value,
                      }
                    : InitialSummaryList
                })
              : InitialSummaryList) as SummaryListProps[]
          }
        />
        <Spacer size={20} />
        <Cards.SummaryCard
          key="2"
          style={{ borderRadius: '10px' }}
          columns={12}
          title="Sell currency account details"
          showCopyIcon
          summaryList={
            (sellAccountDetails
              ? Object.entries(sellAccountDetails).map(([label, value]) => {
                  return value
                    ? {
                        label: label,
                        value: value,
                        hidden: !value,
                      }
                    : InitialSummaryList
                })
              : InitialSummaryList) as SummaryListProps[]
          }
        />
        <Spacer size={20} />
        <Cards.SummaryCard
          key="3"
          style={{ borderRadius: '10px' }}
          columns={12}
          title="Buy currency account details"
          showCopyIcon
          summaryList={
            (buyAccountDetails
              ? Object.entries(buyAccountDetails).map(([label, value]) => {
                  return value
                    ? {
                        label: label,
                        value: value,
                        hidden: !value,
                      }
                    : InitialSummaryList
                })
              : InitialSummaryList) as SummaryListProps[]
          }
        />
        <Spacer size={40} />
      </Spin>
      <DownloadSummary
        payment={{
          accountDetails: conversionDetails,
          paymentDetails: sellAccountDetails,
          beneDetails: buyAccountDetails,
        }}
        paymentDetail={payment as Payment}
        download={downloadPDF}
        callback={() => {
          setDownloadPDF(false)
        }}
      />
    </PageWrapper>
  )
}

export { ConversionHistory }
