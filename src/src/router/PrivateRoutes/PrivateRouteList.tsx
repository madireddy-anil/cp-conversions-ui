import React from 'react'
import { PageNotFound } from 'pages/4xx/404'
import { getRouteUrlWithNamespace } from 'router/routeHelpers'
import { ROUTES } from 'router/RoutesEnum'
import { Conversion } from 'pages/NewConversion'
import { ConversionsDashboard } from 'pages/Conversions/Client/ConversionsDashboard'

interface RouteProps {
  path: string
  title: string
  exact?: boolean
  element: () => JSX.Element
}

type RoutesProps = RouteProps[]

const listOfPrivateRoutes = [
  {
    path: '*',
    exact: false,
    title: 'Not Found',
    element: () => <PageNotFound />,
  },
  {
    path: `${getRouteUrlWithNamespace(ROUTES.NEW_CONVERSION)}`,
    exact: true,
    title: 'Conversion',
    parent: 'unknown',
    isMenuEnabled: false,
    element: () => <Conversion />,
  },
  {
    path: `${getRouteUrlWithNamespace(ROUTES.CONVERSIONS)}`,
    exact: true,
    title: 'Conversions',
    element: () => <ConversionsDashboard />,
  },
  {
    path: `${getRouteUrlWithNamespace(ROUTES.CONVERSION_BY_ID)}`,
    exact: true,
    title: 'Conversion details',
    element: () => <ConversionsDashboard />,
    parent: `${getRouteUrlWithNamespace(ROUTES.CONVERSIONS)}`,
  },
] as RoutesProps

export { listOfPrivateRoutes }
