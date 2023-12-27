import { Authorizer, Login } from '@payconstruct/orbital-auth-provider'
import { ApolloExamplePage } from 'pages/ApolloExample/ApolloPage'
import React from 'react'

interface RouteProps {
  path: string
  title: string
  exact?: boolean
  element: () => JSX.Element
}

type RoutesProps = RouteProps[]

const listOfPublicRoutes = [
  {
    path: '/login',
    exact: true,
    title: 'Home',
    element: () => <Login />,
  },
  {
    path: '/',
    exact: true,
    title: 'Home',
    element: () => <div>HOME</div>,
  },
  {
    path: '/about',
    exact: true,
    title: 'About',
    element: () => <ApolloExamplePage />,
  },
  {
    path: 'verify-authorization',
    exact: false,
    title: 'Verifying Authorization',
    element: () => <Authorizer />,
  },
] as RoutesProps

export default listOfPublicRoutes
export { listOfPublicRoutes }
