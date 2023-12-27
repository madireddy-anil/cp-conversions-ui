import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { Alert } from '@payconstruct/design-system'

const NewAccountServiceMFE: React.FC<FallbackProps> = () => {
  return (
    <Alert
      type="error"
      message="Account creation is temporarily unavailable. We apologies for the inconvenience. Please try again later or contact your customer support representative."
    />
  )
}

export { NewAccountServiceMFE }
