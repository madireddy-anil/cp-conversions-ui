import React from 'react'
import { ConversionSummary } from '../../Summary/ConversionSummary'

interface Confirmation {
  returnUrl: string | null
}
const Confirmation: React.FC<Confirmation> = ({ returnUrl }) => {
  return (
    <div>
      <ConversionSummary returnUrl={returnUrl} />{' '}
    </div>
  )
}

export { Confirmation }
