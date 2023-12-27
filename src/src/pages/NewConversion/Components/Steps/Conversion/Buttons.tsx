import React, { useContext, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Button } from '@payconstruct/design-system'
import { nextStep } from 'context/Actions'
import { useNavigate } from 'react-router-dom'

import styles from '../Steps.module.sass'
import { ConversionsContext } from 'context/Provider'

const Buttons: React.FC = () => {
  const {
    dispatch,
    state: { quote, errMessage, quoteLoading },
  } = useContext(ConversionsContext)
  const navigate = useNavigate()
  const [disable, setDisable] = useState<boolean>(true)

  useEffect(() => {
    if (
      quote.sourceAmount &&
      quote.destinationAmount &&
      quote.sourceCurrency &&
      quote.destinationCurrency &&
      !errMessage
    ) {
      setDisable(false)
    } else setDisable(true)
  }, [quote, errMessage])

  return (
    <div className={classNames(styles['StepContent-footer'], styles['StepContent-footer--buttons'])}>
      <Button
        type="secondary"
        label={'Back'}
        onClick={() => {
          navigate(-1)
        }}
        icon={{ name: 'leftArrow', position: 'left' }}
      />
      <div
        style={{
          display: 'flex',
        }}
      >
        <Button
          type="primary"
          formType="submit"
          label={'Next'}
          disabled={disable || quoteLoading}
          onClick={() => dispatch(nextStep())}
          style={{ marginLeft: '10px' }}
          formId={'new-payment-form'}
          icon={{ name: 'rightArrow', position: 'right' }}
        />
      </div>
    </div>
  )
}

export default Buttons
