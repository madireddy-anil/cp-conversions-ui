// All route names and paths should be here to have a single place to,
// modify all paths and simplify our code

export const CONVERSION_BY_ID_URL = '/conversions/summary/'

enum ROUTES {
  ALL = '/*',
  NEW_CONVERSION = 'new-conversion',
  CONVERSIONS = 'conversions',
  CONVERSION_BY_ID = `conversions/summary/:id`,
}

export { ROUTES }
