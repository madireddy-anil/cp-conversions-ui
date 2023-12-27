import { ROUTES } from './RoutesEnum'

const getRouteUrlWithNamespace = (ROUTE: ROUTES, id?: string) => {
  const url = id ? ROUTE.replace(':id', id) : ROUTE

  return `/${url}`
}

export { getRouteUrlWithNamespace }
