import React from 'react'
import { ProviderWrapper } from 'state/contextProviders/ProviderWrapper'
import { Conversion } from './index'

// interface WrappedNewPaymentProps {
//   onNewBeneficiaryButtonClick?: () => void;
// }

const WrappedConversion: React.FC = () => {
  return (
    <ProviderWrapper>
      <Conversion />
    </ProviderWrapper>
  )
}

export default WrappedConversion
