import React from 'react'
import { ProviderWrapper } from 'state/contextProviders/ProviderWrapper'
import { ConversionsDashboard } from './Client/ConversionsDashboard'

// interface WrappedNewPaymentProps {
//   onNewBeneficiaryButtonClick?: () => void;
// }

const WrappedConversions: React.FC = () => {
  return (
    <ProviderWrapper>
      <ConversionsDashboard />
    </ProviderWrapper>
  )
}

export default WrappedConversions
