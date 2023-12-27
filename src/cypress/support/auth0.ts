// Note: this function leaves you on a blank page, so you must call cy.visit()
// afterwards, before continuing with your test.

function loginViaAuth0Ui(username: string, password: string) {
  cy.intercept('POST', 'https://tst-client-connect.eu.auth0.com/oauth/token').as('Token')
  cy.intercept('GET', `${Cypress.env('organizationsUrl')}/users/*/organisations`).as('GetOrganizations')

  // App landing page redirects to Auth0.
  cy.visit('/login')
  cy.get('button').contains('Login to CMS').should('be.visible').click()

  // Login on Auth0.
  // disable eslint for this line because it's a Cypress command
  // eslint-disable-next-line @typescript-eslint/no-shadow
  cy.origin(Cypress.env('auth0Domain'), { args: { username, password } }, ({ username, password }) => {
    cy.get('input#username').type(username)
    cy.get('input#password').type(password)
    cy.contains('button[value=default]', 'Log In').click({ force: true })
  })

  cy.wait('@Token')

  cy.wait('@GetOrganizations')
    // .its('response.body.status')
    // .should(status => {
    //   expect(status).to.contain('success')
    // })
    .then(() => {
      cy.get('button').contains('test RMZ pvt ltd').click()
      cy.wait('@Token')
    })

  // Second token after selecting organization entity
}

Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  })
  log.snapshot('before')

  cy.session(
    `auth0-${username}`,
    () => {
      loginViaAuth0Ui(username, password)
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        cy.wrap(localStorage)
          .invoke('getItem', `@AuthOrganization:${Cypress.env('auth0ClientId')}`)
          .should('exist')

        cy.wrap(localStorage)
          .invoke(
            'getItem',
            '@@auth0spajs@@' +
              `::${Cypress.env('auth0ClientId')}::${Cypress.env('auth0Audience')}::${Cypress.env('auth0Scope')}`
          )
          .should('exist')
      },
    }
  )

  log.snapshot('after')
  log.end()
})
