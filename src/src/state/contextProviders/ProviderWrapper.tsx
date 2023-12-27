import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, ErrorHandler } from 'pages/Error/ErrorHandler'
import { AsyncIntlProvider } from './intl/IntlProvider'
import { ApolloProvider } from 'state/contextProviders/apollo/ApolloProvider'
import { LaunchDarklyContext } from './LDProvider'

const ProviderWrapper: React.FC = ({ children }) => {
  return (
    <LaunchDarklyContext>
      <ApolloProvider>
        <AsyncIntlProvider>
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onError={ErrorHandler}
            onReset={() => {
              console.log('Reset?')
            }}
          >
            {children}
          </ErrorBoundary>
        </AsyncIntlProvider>
      </ApolloProvider>
    </LaunchDarklyContext>
  )
}

export { ProviderWrapper }
