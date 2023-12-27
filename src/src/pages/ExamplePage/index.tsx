import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'
import { getClientAccounts } from 'state/contextProviders/apollo/queries/Accounts'

import { AdminComponent } from './Admin/AdminComponent'
import { ClientComponent } from './Client/ClientComponent'

/**``
 * index is responsible for rendering the component based on the portal type.
 * @returns `<ClientComponent />` or `<AdminComponent />`.
 */
const Example: React.FC = () => {
  const { portal, isAuthenticated } = useContext(AuthContext)

  const { loading, error, data } = useQuery(getClientAccounts)

  console.log('Example isAuthenticated: ', isAuthenticated)
  console.log('Example Portal: ', portal)
  console.log('GQL Error: ', error)
  console.log('GraphQL Accounts Query: ', data?.GetClientAccounts?.accounts)

  if (loading) return <div>Loading components</div>

  if (portal === PortalEnum.CMS) return <ClientComponent />
  if (portal === PortalEnum.BMS) return <AdminComponent />

  return <div>Loading components</div>
}

export { Example }
