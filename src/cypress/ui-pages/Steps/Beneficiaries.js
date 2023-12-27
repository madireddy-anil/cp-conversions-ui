/// <reference types="cypress" />

import beneficiaryMock from '../../fixtures/beneficiaries.json'

class Beneficiaries {
  beneficiaries() {
    it('Test scrolling on the Beneficiaries list', () => {
      cy.wait(1000)
        .get('#Beneficiaries-list')
        .find('div')
        .then($lis => {
          if ($lis.length > 10) {
            cy.get('#Beneficiaries-list').scrollTo('bottom', {
              easing: 'linear',
              duration: 2000,
            })
            cy.get('#Beneficiaries-list').scrollTo('top', {
              easing: 'linear',
              duration: 2000,
            })
          }
        })
    })

    it('Search beneficiary with bene name', () => {
      const enterCurrency = cy.get("input[name='bene_search']")
      enterCurrency.focus().type('test', { log: false }).blur()

      cy.wait(2000).get('#close').click()
    })

    it('Search the beneficiary with bene name: [ new external bene ] and mock the data once the API get successful and check whether the mock data is reflecting on UI', () => {
      cy.intercept('POST', Cypress.env('graphqlUrl'), req => {
        if (req.body.operationName === 'BeneficiaryFullTextSearch') {
          console.log(req.body.operationName, 'OPERATION_NAME')
          // Declare the alias from the initial intercept in the beforeEach
          req.alias = 'gqlBeneficiaryFullTextSearchQuery'

          // Set req.fixture or use req.reply to modify portions of the response
          req.reply(res => {
            res.body.data = {
              BeneficiaryFullTextSearch: beneficiaryMock.BeneficiaryFullTextSearch,
            }
          })
        }
      })

      const enterCurrency = cy.get("input[name='bene_search']")
      enterCurrency
        .focus()
        .type(beneficiaryMock.BeneficiaryFullTextSearch[0].accountDetails.nameOnAccount, { log: false })
        .blur()

      describe('Check beneficiary API search response', () => {
        cy.wait('@gqlBeneficiaryFullTextSearchQuery')
          .its('response.body.data.BeneficiaryFullTextSearch')
          .should(BeneficiaryFullTextSearch => {
            expect(BeneficiaryFullTextSearch).to.have.length(1)
          })
      })
    })

    it('Select the beneficiary', () => {
      cy.get(`#0-${beneficiaryMock.BeneficiaryFullTextSearch[0].accountDetails.accountNumber}`).click()
    })
  }
}

export default Beneficiaries
