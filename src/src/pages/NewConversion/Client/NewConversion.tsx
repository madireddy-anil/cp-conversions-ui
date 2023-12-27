import React, { useContext, useEffect, useMemo } from 'react'
import { StepTracker, Colors } from '@payconstruct/design-system'
import { Conversion } from '../Components/Steps/Conversion'
import { Confirmation } from '../Components/Steps/Confirmation'
import { ConversionSummary } from '../Components/Summary/ConversionSummary'
import { getAccountById } from 'state/contextProviders/apollo/queries/Accounts'
import { useLazyQuery } from '@apollo/client'
import { useQuote } from '../Components/Steps/useQuote'
import styles from './Client.module.sass'
import { ConversionsContext } from 'context/Provider'
import { SetSellAccount } from 'context/Actions'

interface NewConversionProps {
  accountId: string | null
  returnUrl: string | null
}

//* Steps Wrapper to use context provider
const Steps: React.FC<NewConversionProps> = ({ accountId, returnUrl }) => {
  useQuote()
  const {
    dispatch,
    state: { step, stepStatus },
  } = useContext(ConversionsContext)

  const [getAccounts] = useLazyQuery(getAccountById, {
    onCompleted({ GetAccountById }) {
      const selectedAccount = GetAccountById
      if (selectedAccount) {
        dispatch(SetSellAccount(selectedAccount))
      }
      if (!selectedAccount) {
        console.log('Account not found')
      }
    },
  })

  useEffect(() => {
    if (accountId) {
      getAccounts({ variables: { id: accountId } })
    }
  }, [accountId])

  //* Each Step
  const stepsTrackerData = [
    {
      key: 0,
      title: 'Conversion',
      content: <Conversion />,
    },
    {
      key: 1,
      title: 'Confirmation',
      content: <Confirmation returnUrl={returnUrl} />,
    },
  ]

  const modifiedStepsTrackerData = useMemo(() => {
    return stepsTrackerData.map(step => {
      if (step.title === 'Conversion')
        return {
          ...step,
          content: <Conversion />,
        }
      if (step.title === 'Confirmation')
        return {
          ...step,
          content: <Confirmation returnUrl={returnUrl} />,
        }

      return step
    })
  }, [])

  return (
    <div className={styles['ConversionClient']}>
      <div
        className={styles['ConversionClient__bg']}
        style={{
          backgroundColor: Colors.grey.neutral50,
        }}
      >
        <StepTracker current={step} stepData={modifiedStepsTrackerData} status={stepStatus} />
      </div>
      {step === 0 && <ConversionSummary returnUrl={returnUrl} />}
    </div>
  )
}

const NewConversion: React.FC<NewConversionProps> = ({ accountId, returnUrl }) => {
  return <Steps accountId={accountId} returnUrl={returnUrl} />
}

export { NewConversion }
