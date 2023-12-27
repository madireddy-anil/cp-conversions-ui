import React from 'react'
import { Icon, Spacer, Text } from '@payconstruct/design-system'
import { ConversionStatusFooter } from './Footer'
import style from './Status.module.sass'

interface SuccessTransactionProps {
  paymentId: string
  returnUrl: string | null
}
const ConversionSuccess: React.FC<SuccessTransactionProps> = ({ paymentId = '', returnUrl }) => {
  return (
    <>
      <div className={style['ConversionStatus']}>
        <Icon name="checkCircle" />
        <Text mode={'dark'} size="xlarge" weight="bold">
          Your conversion is being processed
        </Text>
      </div>

      <Spacer size={32} />

      <Text mode={'dark'}>
        Your conversion has been submitted successfully and is being processed. To view the status of your conversion,
        please head to the FX dashboard.
      </Text>
      <Spacer size={20} />

      <Text mode={'dark'}>Reference number: {paymentId}</Text>
      <Spacer size={32} />

      <ConversionStatusFooter returnUrl={returnUrl} />
    </>
  )
}

export { ConversionSuccess }
