import React from 'react'
import { Button } from '@payconstruct/design-system'
import { useNavigate } from 'react-router-dom'
interface ConversionStatusFooterProps {
  returnUrl: string | null
}

const ConversionStatusFooter: React.FC<ConversionStatusFooterProps> = ({ returnUrl }) => {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex' }}>
      <Button
        mode="dark"
        type="primary"
        label={'Done'}
        style={{ marginRight: '15px' }}
        onClick={() => navigate(returnUrl ?? '/')}
      />
      <Button
        mode="dark"
        type="secondary"
        label={'FX Dashboard'}
        onClick={() => {
          navigate('/conversions')
        }}
      />
    </div>
  )
}

export { ConversionStatusFooter }
