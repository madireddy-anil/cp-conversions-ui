import React, { useEffect, useMemo, useState } from 'react'
import { IntlProvider } from 'react-intl'
import { LTRLanguages } from 'config/variables'
import englishTranslation from 'config/i18n/langMessages/en-US.json'
import { LOCALE } from 'config/i18n/locales'

//* Create a context provider to expose change globally
const AsyncIntlProvider: React.FC = ({ children }) => {
  const [lang] = useState(LOCALE.ENGLISH)
  const [langMessages, setLangMessages] = useState(englishTranslation)

  const contentDirection = useMemo(() => {
    return LTRLanguages.includes(lang) ? 'rtl' : 'ltr'
  }, [lang])

  useEffect(() => {
    import(`../../../config/i18n/langMessages/${lang}.json`)
      .then(messages => {
        setLangMessages(messages)
      })
      .catch(e => console.log(`Error loading translations for ${lang}`, e))
  }, [])

  return (
    <IntlProvider locale={lang} key={lang} messages={langMessages} defaultLocale="en-US">
      <div id="IntlProvider" dir={contentDirection}>
        {children}
      </div>
    </IntlProvider>
  )
}

export { AsyncIntlProvider }
