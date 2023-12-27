import React from 'react'
import { Icon, Spacer, Text } from '@payconstruct/design-system'
import { ConversionStatusFooter } from './Footer'
import style from './Status.module.sass'

interface ErrorTransactionProps {
  paymentId: string
  returnUrl: string | null
}
const ConversionFail: React.FC<ErrorTransactionProps> = ({ returnUrl }) => {
  return (
    <>
      <div className={style['ConversionStatus']}>
        <Icon name="exclamationCircleOutline" />
        <Text mode={'dark'} size="xlarge" weight="bold">
          Error in submitting your payment
        </Text>
      </div>
      <Spacer size={32} />

      <Text mode={'dark'}>
        We apologise for the inconvenience. Please get in touch with your customer service representative.
      </Text>
      <Spacer size={20} />

      <ConversionStatusFooter returnUrl={returnUrl} />
    </>
  )
}

export { ConversionFail }
