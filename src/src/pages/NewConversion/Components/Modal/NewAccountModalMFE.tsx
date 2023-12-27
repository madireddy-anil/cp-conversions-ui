import React, { lazy } from 'react'
import { ErrorHandler } from 'pages/Error/ErrorHandler'
import { ErrorBoundary } from 'react-error-boundary'
import { NewAccountServiceMFE } from 'pages/Error/NewAccountServiceMFE'
import { AccountCreateResponse } from '__generated__/graphql'

const NewAccountModal = lazy(() => import('newAccounts/NewAccountModal'))

interface NewAccountModelProps {
  title?: string
  visible?: boolean
  hideModal?: () => void
  setShowAllAccounts?: (value: boolean) => void
  toggleShowCallback?: (v: boolean) => void
  onSuccessNewAccountCreation?: (v: AccountCreateResponse) => void
  onFailNewAccountCreation?: (v: string) => void
}

//! Check for Permissions to Write. from usePermissions hook
const NewAccountModalMFE: React.FC<NewAccountModelProps> = props => {
  return (
    <ErrorBoundary
      //! This is a error Page, in this case we want a error message to be displayed.
      FallbackComponent={NewAccountServiceMFE}
      onError={ErrorHandler}
      onReset={() => {
        console.log('Reset?')
      }}
    >
      {/* Render the MFE component here. */}
      {/* {LDFlags[flags.NewAccountModal] ? <NewAccountModal /> : <OldNewAccountModal />} */}
      <NewAccountModal {...props} />
    </ErrorBoundary>
  )
}

export { NewAccountModalMFE }
