import React, { useContext } from 'react'
import { Colors, Text, Cards, Spacer } from '@payconstruct/design-system'
import { Helpers } from '@payconstruct/fe-utils'
import styles from './ConversionSummary.module.sass'
import { ConversionsContext } from 'context/Provider'

const { fractionFormat } = Helpers
interface Rate {
  className?: string
}

const RateSummary: React.FC<Rate> = ({ className }) => {
  const {
    state: { step, quote },
  } = useContext(ConversionsContext)
  // const decimalForDestinationAmt = currencies.find(
  //   (currencies: Currency) => currencies?.code === quote?.destinationCurrency
  // );
  return (
    <aside
      className={styles[className ?? '']}
      style={{
        backgroundColor: Colors.grey.neutral800,
      }}
    >
      {step === 0 && quote?.allInRate && (
        <>
          <Text size="default" weight="bold" color={Colors.white.primary}>
            Indicative rate
          </Text>
          <Spacer size={35} />
        </>
      )}

      {quote?.allInRate && (
        <Cards.BasicCard
          style={{
            borderRadius: '10px',
            border: '1px solid #535353',
            background: Colors.black.primary,
          }}
        >
          <div className={styles['RateSummary']}>1 {quote?.sourceCurrency}</div>
          <div className={styles['RateSummary']}>
            {fractionFormat(Number(quote?.allInRate), 5)} {quote.destinationCurrency}
          </div>
          <div className={styles['Rate']}>
            {quote.allInRate} {quote.destinationCurrency}
          </div>
        </Cards.BasicCard>
      )}
    </aside>
  )
}

export { RateSummary }
