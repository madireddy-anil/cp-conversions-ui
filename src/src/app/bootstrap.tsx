import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk'
import { launchDarklyKey } from 'config/variables'
;(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: launchDarklyKey,
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
  })

  ReactDOM.render(
    <LDProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LDProvider>,
    document.getElementById('root')
  )
})()
