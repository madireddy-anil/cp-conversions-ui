import React, { useContext } from 'react'
import { ProgressLine, Spacer } from '@payconstruct/design-system'
import { ConversionsContext } from 'context/Provider'

const IndicativeRate: React.FC = () => {
  const {
    state: { quoteLoading, sellAccount, buyAccount, quote },
  } = useContext(ConversionsContext)

  const FromCurrency = sellAccount?.currency ? `1 ${sellAccount?.currency ?? ''}` : ''
  const ToCurrencyWithRate = quote?.allInRate ? `= ${quote?.allInRate ?? ''} ${buyAccount?.currency ?? ''}` : ''

  return (
    <>
      <ProgressLine
        label="Rate:"
        mode="light"
        value={quoteLoading ? 'Calculating...' : `${FromCurrency} ${ToCurrencyWithRate}`}
      />
      <Spacer size={20} />
    </>
  )
}

export default IndicativeRate
