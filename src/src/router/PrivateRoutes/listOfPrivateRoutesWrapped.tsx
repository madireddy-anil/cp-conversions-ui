import React from 'react'
import { listOfPrivateRoutes } from 'router/PrivateRoutes/PrivateRouteList'
import { ProviderWrapper } from 'state/contextProviders/ProviderWrapper'

const listOfPrivateRoutesWrapped = listOfPrivateRoutes.map(route => ({
  ...route,
  element: () => {
    return <ProviderWrapper>{route.element()}</ProviderWrapper>
  },
}))

export default listOfPrivateRoutesWrapped
