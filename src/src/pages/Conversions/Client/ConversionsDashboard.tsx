import React, { useContext } from 'react'
import { AuthContext, PortalEnum } from '@payconstruct/orbital-auth-provider'
import { Conversions as ConversionsList } from '../Components/Conversions/Conversions'
import { ConversionHistory } from '../Components/ConversionHistory'
import { CONVERSION_BY_ID_URL, ROUTES } from 'router/RoutesEnum'
import { useLocation } from 'react-router-dom'
import ConversionsProvider from 'context/Provider'
import { Hooks } from '@payconstruct/fe-utils'

const { useCurrencies } = Hooks

export const ConversionsDashboard: React.FC = () => {
  const { portal } = useContext(AuthContext)
  const location = useLocation()
  const { currencies } = useCurrencies()

  return (
    <ConversionsProvider>
      {portal === PortalEnum.CMS && `/${ROUTES.CONVERSIONS}` === location.pathname && (
        <ConversionsList currencies={currencies} />
      )}

      {portal === PortalEnum.CMS && location.pathname.includes(CONVERSION_BY_ID_URL) && (
        <ConversionHistory currencies={currencies} />
      )}
    </ConversionsProvider>
  )
}
