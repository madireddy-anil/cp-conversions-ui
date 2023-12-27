import { Button } from '@payconstruct/design-system'
import { AuthContext } from '@payconstruct/orbital-auth-provider'
import { logoutUrl } from 'config/variables'
import React, { useContext } from 'react'
import { Route, Link, Outlet } from 'react-router-dom'
import { ROUTES } from 'router/RoutesEnum'
import { getRouteUrlWithNamespace } from 'router/routeHelpers'

/**
 * Public route component that render children components
 * @returns
 */
export const PublicRoute = () => {
  return (
    <Route path="/" element={<Navigation />}>
      <Outlet />;
    </Route>
  )
}

/**
 * Route with a navigation component together, you can have a menu and the main page rendered
 * @returns
 */
export const Navigation: React.FC = () => {
  const { logout, isAuthenticated } = useContext(AuthContext)

  return (
    <div>
      <Link to="/">
        {' '}
        <Button type="secondary" label="Home MFE" icon={{ name: 'rightArrow', position: 'right' }} />{' '}
      </Link>
      <br />
      <Link to="/about">
        <Button type="secondary" label="Your Public Route" icon={{ name: 'rightArrow', position: 'right' }} />
      </Link>
      <br />
      <Link to={`${getRouteUrlWithNamespace(ROUTES.NEW_CONVERSION)}`}>
        <Button type="secondary" label="New Conversion" icon={{ name: 'rightArrow', position: 'right' }} />
      </Link>
      <br />
      <Link to={`${getRouteUrlWithNamespace(ROUTES.NEW_CONVERSION)}?accountId=0f4468bc-1f65-430e-ab8b-dec297ea528c`}>
        <Button
          type="secondary"
          label="New Conversion with AccountId"
          icon={{ name: 'rightArrow', position: 'right' }}
        />
      </Link>
      <br />
      <Link to={`${getRouteUrlWithNamespace(ROUTES.CONVERSIONS)}`}>
        <Button type="secondary" label=" Conversions Dashboard" icon={{ name: 'rightArrow', position: 'right' }} />
      </Link>
      <br />
      <Outlet />
      <br />
      {isAuthenticated && <Button label="Logout Me" type="primary" onClick={() => logout({ returnTo: logoutUrl })} />}
    </div>
  )
}
