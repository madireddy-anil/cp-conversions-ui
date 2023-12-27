import React, { useContext, useState } from 'react'
import { Colors, Text, Spacer, Button } from '@payconstruct/design-system'
import { RateSummary } from './RateSummary'
import { Cards } from '@payconstruct/design-system'
import { ConversionSuccess } from '../Steps/Status/Success'
import { ConversionFail } from '../Steps/Status/Fail'
import { CreatePaymentRequest, useNewPaymentMutation } from 'helpers/customHooks/useNewPayment'
// import {
//   CurrencyType,
//   ProcessFlow
// } from "pages/NewConversion/Conversions.interface";
import { ConversionsContext } from 'context/Provider'
import { nextStep, previousStep, setStepStatus } from 'context/Actions'
import { cleanCurrencyFormat } from 'helpers/customHelpers/customHelper'
import { conversionDurationText } from 'helpers/customHelpers/conversionDuration'

// import styles from "./ConversionSummary.module.sass";

interface CardWrapper {
  title: string
}

interface ConversionSummaryProps {
  returnUrl: string | null
}

const ConversionSummary: React.FC<ConversionSummaryProps> = ({ returnUrl }) => {
  const {
    dispatch,
    state: { step, quote, sellAccount, buyAccount, description },
  } = useContext(ConversionsContext)

  const [confirm, setConfirm] = useState<'success' | 'fail'>()
  const [createNewPayment, { data: paymentResponse, loading }] = useNewPaymentMutation()

  const createPayment = async () => {
    const paymentRequest: CreatePaymentRequest = {
      accountId: sellAccount?.id ?? '',
      creditorAccountId: buyAccount?.id ?? '',
      creditCurrency: buyAccount?.currency ?? '',
      debitCurrency: sellAccount?.currency ?? '',
      debitAmount: cleanCurrencyFormat(quote?.sourceAmount ?? ''),
      creditAmount: cleanCurrencyFormat(quote?.destinationAmount ?? ''),
      requestSource: 'clientPortal',
    }
    description && (paymentRequest.remittanceInformation = description)
    createNewPayment(paymentRequest)
      .then(response => {
        // Fetch doesn't send (404 error) to catch, So added below code.
        if (response.statusCode >= 400) {
          throw new Error('Server responds with error!')
        }
        dispatch(nextStep())
        dispatch(setStepStatus('finish'))
        setConfirm('success')
      })
      .catch(() => {
        dispatch(nextStep())
        dispatch(setStepStatus('error'))
        setConfirm('fail')
      })
  }

  // const getTimeDurationText = (
  //   FromCurrencyType: CurrencyType["currency"],
  //   ToCurrencyType: CurrencyType["currency"]
  // ) => {
  //   const Type = `${FromCurrencyType}-${ToCurrencyType}`;
  //   switch (Type) {
  //     case ProcessFlow.FiatToFiat:
  //       return "a few seconds";
  //     case ProcessFlow.FiatToCrypto || ProcessFlow.CryptoToCrypto:
  //       return "a few minutes";
  //     case ProcessFlow.CryptoToFiat:
  //       return "a few hours";
  //     default:
  //       return "";
  //   }
  // };

  const ConfirmationPageWrapper: React.FC = ({ children }) => {
    return (
      <>
        <div
          style={{
            backgroundColor: Colors.grey.neutral800,
            width: 'calc(100% + 184px)',
            height: 'calc(100% + 40px)',
            position: 'absolute',
            zIndex: '0',
            top: '-40px',
            left: '-50px',
          }}
        />
        <section
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '580px',
            minHeight: 'calc(100vh - 56px)',
          }}
        >
          {confirm === 'fail' && (
            <ConversionFail returnUrl={returnUrl} paymentId={paymentResponse?.transactionReference ?? ''} />
          )}
          {confirm === 'success' && (
            <ConversionSuccess returnUrl={returnUrl} paymentId={paymentResponse?.transactionReference ?? ''} />
          )}

          {confirm == null && children}
        </section>
      </>
    )
  }

  const CardWrapper: React.FC<CardWrapper> = ({ title, children }) => {
    return (
      <div>
        <Spacer size={25} />
        <Text size="small" weight="bold" mode="dark">
          {title}
          <Spacer size={10} />
        </Text>
        {children}
      </div>
    )
  }

  return (
    <>
      {step === 1 ? (
        <ConfirmationPageWrapper>
          <Text size="xlarge" mode="dark" weight="bold">
            <span id="Confirmation">Confirm conversion</span>
          </Text>
          <Spacer size={40} />
          <Text size="small" mode="dark">
            Please check the details of your conversion before confirming the transaction.
          </Text>

          <CardWrapper title="You sell">
            <Cards.TileCard
              currencyCode={sellAccount?.currency}
              description={`${sellAccount?.accountName} | ${sellAccount?.availableBalance} ${sellAccount?.currency}`}
              mode="dark"
              title={quote?.sourceAmount}
            />
          </CardWrapper>

          <CardWrapper title="You buy (indicative)">
            <Cards.TileCard
              currencyCode={buyAccount?.currency}
              description={`${buyAccount?.accountName} | ${buyAccount?.availableBalance} ${buyAccount?.currency}`}
              mode="dark"
              title={quote?.destinationAmount}
            />
          </CardWrapper>

          <CardWrapper title="Indicative rate">
            <RateSummary />
          </CardWrapper>

          <Spacer size={25} />
          <Text size="small" mode="dark" color={Colors.grey.neutral500}>
            Description:{' '}
            <Text
              size="small"
              mode="dark"
              weight="regular"
              color={Colors.white.primary}
              data-test="summary-description"
            >
              {description}
            </Text>
          </Text>

          <div>
            <Text size="small" mode="dark" weight="regular">
              <Spacer size={20} />
              {conversionDurationText(sellAccount?.currency ?? '', buyAccount?.currency ?? '')}
            </Text>
            <Spacer size={30} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '25px',
            }}
          >
            <Button
              mode="dark"
              type="secondary"
              label={'Back'}
              onClick={() => dispatch(previousStep())}
              disabled={loading}
              icon={{ name: 'leftArrow', position: 'left' }}
            />
            <Button
              loading={loading}
              disabled={loading}
              mode="dark"
              type="primary"
              label={'Confirm'}
              onClick={createPayment}
            />
          </div>
        </ConfirmationPageWrapper>
      ) : (
        <RateSummary className="ConversionSummary" />
      )}
    </>
  )
}

export { ConversionSummary }
