/// <reference types="cypress" />

import accountsMock from '../../fixtures/accounts.json'

class Accounts {
  accounts() {
    it('Test scrolling on the accounts list if the list has >= 10', () => {
      cy.wait(1000)
        .get('#accounts-list')
        .find('div')
        .then($lis => {
          const scrollable = $lis.length >= 10 ?? false

          cy.get('#accounts-list').scrollTo('bottom', {
            ensureScrollable: scrollable,
            easing: 'linear',
            duration: 2000,
          })
          cy.get('#accounts-list').scrollTo('top', {
            ensureScrollable: scrollable,
            easing: 'linear',
            duration: 2000,
          })
        })
    })

    // it("Test whether the account has no balance is selectable", () => {
    //   cy.intercept("POST", Cypress.env("graphqlUrl"), (req) => {
    //     if (req.body.operationName === "AccountsFullTextSearch") {
    //       console.log(req.body.operationName, "OPERATION_NAME");
    //       // Declare the alias from the initial intercept in the beforeEach
    //       req.alias = "gqlAccountsFullTextSearchQuery";
    //     }
    //   });

    //   const enterCurrency = cy.get("input[name='account_search']");
    //   enterCurrency
    //     .focus()
    //     .type(accountsMock.AccountsFullTextSearch[1].accountNumber)
    //     .blur();

    //   describe("Check accounts API search response", () => {
    //     cy.wait("@gqlAccountsFullTextSearchQuery")
    //       .its("response.body.data.AccountsFullTextSearch")
    //       .should((AccountsFullTextSearch) => {
    //         expect(AccountsFullTextSearch).to.have.length(1);
    //       })
    //       .then(() => {
    //         cy.get(
    //           `#0-${accountsMock?.AccountsFullTextSearch[1]?.accountNumber}`
    //         ).click();

    //         cy.xpath("//button[contains(text(), 'Next')]").should("not.exist");
    //       });
    //   });
    // });

    it('Search currency with USD', () => {
      const enterCurrency = cy.get("input[name='account_search']")
      enterCurrency.focus().type('USD').blur()

      cy.wait(2000).get('#close').click()
    })

    it('Search the account with currency: GBP and mock the data once the API gets successful and check whether the mock data is reflecting on UI', () => {
      cy.intercept('POST', Cypress.env('graphqlUrl'), req => {
        if (req.body.operationName === 'AccountsFullTextSearch') {
          console.log(req.body.operationName, 'OPERATION_NAME')
          // Declare the alias from the initial intercept in the beforeEach
          req.alias = 'gqlAccountsFullTextSearchQuery'

          // Set req.fixture or use req.reply to modify portions of the response
          req.reply(res => {
            res.body.data = {
              AccountsFullTextSearch: accountsMock.AccountsFullTextSearch,
            }
          })
        }
      })

      const enterCurrency = cy.get("input[name='account_search']")
      enterCurrency.focus().type('GBP').blur()

      describe('Check accounts API search response', () => {
        cy.wait('@gqlAccountsFullTextSearchQuery')
          .its('response.body.data.AccountsFullTextSearch')
          .should(AccountsFullTextSearch => {
            expect(AccountsFullTextSearch).to.have.length(2)
          })
      })
    })

    it('Search the account with account number', () => {
      cy.wait(1000).get('#close').click()
      const enterCurrency = cy.get("input[name='account_search']")
      enterCurrency
        .focus()
        .type(`${accountsMock?.AccountsFullTextSearch[0]?.accountIdentification?.accountNumber}`)
        .blur()
    })

    it('Select the account', () => {
      cy.get(`#0-${accountsMock?.AccountsFullTextSearch[0]?.accountIdentification?.accountNumber}`).click()
    })
  }
}

export default Accounts
