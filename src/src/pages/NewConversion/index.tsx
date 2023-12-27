import React, { useContext } from 'react'
import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'
import { Spin } from '@payconstruct/design-system'
import { NewConversion } from './Client/NewConversion'
import ConversionsProvider from 'context/Provider'
import { useQuery } from 'helpers/customHooks/useQuery'

/**
 * index is responsible for rendering the component based on the portal type.
 *
 * Skip the first step by sending the accountId in the URL parameters `?accountId=YOUR_ID_HERE`
 * @returns `<ClientComponent />` or `<AdminComponent />`.
 */
const Conversion: React.FC = () => {
  const { portal, isFetching } = useContext(AuthContext)

  const accountId = useQuery().get('accountId')
  const returnUrl = useQuery().get('returnUrl')

  return (
    <Spin loading={isFetching}>
      {portal === PortalEnum.CMS && (
        <ConversionsProvider>
          <NewConversion accountId={accountId} returnUrl={returnUrl} />
        </ConversionsProvider>
      )}
    </Spin>
  )
}

export { Conversion }
