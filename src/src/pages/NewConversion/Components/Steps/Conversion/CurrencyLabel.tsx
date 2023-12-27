import React from 'react'
import { CurrencyTag } from '@payconstruct/design-system'

type CurrencyLabel = {
  currency: string | undefined
}

const CurrencyLabel: React.FC<CurrencyLabel> = ({ currency }) => {
  const currencyTag = (
    <span style={{ margin: '3px 0px 0px 6px' }}>
      <CurrencyTag currency={'GBP'} prefix={currency} type="simple" />
    </span>
  )
  const currencyLabel = (
    <span style={{ display: 'flex', alignItems: 'center' }}>
      {currency ?? ''} {currencyTag}
    </span>
  )
  return <>{currencyLabel}</>
}

export default CurrencyLabel
