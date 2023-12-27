import { defineConfig } from 'cypress'
import { config } from 'dotenv'

//* Specify the path to the .env file
config({ path: 'env/local.env' })

import {
  auth0Audience,
  auth0ClientId,
  auth0Domain,
  auth0Redirection,
  auth0Scope,
  cyAuthUserName,
  cyAuthUserPassword,
  cyAuthUserName_2,
  cyAuthUserPassword_2,
  graphQLHttpURL,
  CYPRESS_PROJECT_ID,
} from './src/config/variables'

export default defineConfig({
  projectId: CYPRESS_PROJECT_ID,
  chromeWebSecurity: false,
  videoCompression: false,
  video: false,
  env: {
    username: cyAuthUserName,
    password: cyAuthUserPassword,
    username_2: cyAuthUserName_2,
    password_2: cyAuthUserPassword_2,
    graphqlUrl: graphQLHttpURL,
    auth0Domain,
    auth0ClientId,
    auth0Audience,
    auth0Scope,
    auth0Redirection,
    organizationsUrl: 'https://cc-api.tst.payperform.com/v1',
  },
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/integration',
    supportFile: 'cypress/support/commands.ts',
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      // include any other plugin code...

      // It's IMPORTANT to return the config object
      // with any changed environment variables
      return config
    },
  },
})
