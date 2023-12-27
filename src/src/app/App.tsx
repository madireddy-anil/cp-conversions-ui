import React, { Suspense } from 'react'
import { listOfPrivateRoutes } from '../router/PrivateRoutes'
import { listOfPublicRoutes } from '../router/PublicRoutes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigation } from 'router/PublicRoutes/PublicRoute'
import { Notification } from '@payconstruct/design-system'
import {
  auth0Domain,
  auth0ClientId,
  auth0Audience,
  auth0Scope,
  auth0Redirection,
  logoutUrl,
  environment,
} from 'config/variables'
import { ApolloProvider } from 'state/contextProviders/apollo/ApolloProvider'
import { AsyncIntlProvider } from 'state/contextProviders/intl/IntlProvider'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback, ErrorHandler } from 'pages/Error/ErrorHandler'
import { AuthContextWrapper, ProtectRoute } from '@payconstruct/orbital-auth-provider'
import { Environment } from '@payconstruct/orbital-auth-provider/dist/auth0/AuthState'

import { TopBar } from '../components/TopBar/TopBar'
import { FullScreenLoading } from 'components/FullPageLoading/FullScreenLoading'
import ConversionsProvider from 'context/Provider'
import { LaunchDarklyContext } from 'state/contextProviders/LDProvider'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthContextWrapper
        environment={environment as Environment}
        logoutUrl={logoutUrl}
        domain={auth0Domain}
        clientId={auth0ClientId}
        audience={auth0Audience}
        scope={auth0Scope}
        redirectUri={auth0Redirection}
        cacheLocation="localstorage"
        useRefreshTokens={true}
        encryptKey={'orbitalAuth'}
        idleTime={environment === 'tst' ? 18000000 : 900000}
        onLogout={logoutType => {
          if (logoutType === 'sessionExpired')
            Notification({
              type: 'warning',
              message: `Your session has expired!`,
            })

          if (logoutType === 'userAction')
            Notification({
              type: 'success',
              message: `User logged out!`,
            })
        }}
      >
        <LaunchDarklyContext>
          <ApolloProvider>
            <AsyncIntlProvider>
              <Suspense fallback={<FullScreenLoading />}>
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onError={ErrorHandler}
                  onReset={() => {
                    console.log('Reset?')
                  }}
                >
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Navigation />}>
                      {listOfPublicRoutes.map(publicRoute => (
                        <Route key={publicRoute.path} path={publicRoute.path} element={<publicRoute.element />} />
                      ))}
                    </Route>
                    {/* Private Routes */}
                    <Route path="/" element={<ProtectRoute redirectUrl="/login" />}>
                      {listOfPrivateRoutes.map(privateRoute => (
                        <Route
                          key={privateRoute.path}
                          path={privateRoute.path}
                          element={
                            <div
                              style={{
                                position: 'relative',
                                display: 'inline-block',
                                transform: 'translate3d(0, 0, 0)',
                                width: '100%',
                              }}
                            >
                              <TopBar title={privateRoute.title} />
                              <ConversionsProvider>
                                <privateRoute.element />
                              </ConversionsProvider>
                            </div>
                          }
                        />
                      ))}
                    </Route>
                  </Routes>
                </ErrorBoundary>
              </Suspense>
            </AsyncIntlProvider>
          </ApolloProvider>
        </LaunchDarklyContext>
      </AuthContextWrapper>
    </BrowserRouter>
  )
}

export default App
