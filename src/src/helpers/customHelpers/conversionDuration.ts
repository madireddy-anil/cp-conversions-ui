const commonCurrenciesFiat = ['EUR', 'USD', 'GBP', 'CAD', 'CHF', 'CZK', 'DKK', 'HUF', 'NOK', 'PLN', 'RON', 'SEK']
const commonCurrenciesCrypto = ['USDT', 'USDC', 'ETH', 'BTC', 'BCH', 'LTC']

const conversionTiming = {
  oneWorkingDay: {
    sellCurrencies: commonCurrenciesFiat,
    buyCurrencies: commonCurrenciesFiat,
    message: 'The conversion should take up to one working day to complete.',
  },
  twoWorkingDays: {
    sellCurrencies: commonCurrenciesFiat,
    buyCurrencies: commonCurrenciesCrypto,
    message: 'The conversion should take up to two working days to complete.',
  },
  twoWorkingDays01: {
    sellCurrencies: commonCurrenciesCrypto,
    buyCurrencies: commonCurrenciesFiat,
    message: 'The conversion should take up to two working days to complete.',
  },
  fewHours: {
    sellCurrencies: commonCurrenciesCrypto,
    buyCurrencies: commonCurrenciesCrypto,
    message: 'The conversion should take a few hours to complete.',
  },
}

export const conversionDurationText = (sellCurrency: string, buyCurrency: string) => {
  if (
    conversionTiming.oneWorkingDay.sellCurrencies.includes(sellCurrency) &&
    conversionTiming.oneWorkingDay.buyCurrencies.includes(buyCurrency)
  ) {
    return conversionTiming.oneWorkingDay.message
  } else if (
    conversionTiming.twoWorkingDays.sellCurrencies.includes(sellCurrency) &&
    conversionTiming.twoWorkingDays.buyCurrencies.includes(buyCurrency)
  ) {
    return conversionTiming.twoWorkingDays.message
  } else if (
    conversionTiming.twoWorkingDays01.sellCurrencies.includes(sellCurrency) &&
    conversionTiming.twoWorkingDays01.buyCurrencies.includes(buyCurrency)
  ) {
    return conversionTiming.twoWorkingDays01.message
  } else {
    return conversionTiming.fewHours.message
  }
}
