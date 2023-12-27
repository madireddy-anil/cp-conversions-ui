/// <reference types="cypress" />

class Confirmation {
  confirmation() {
    it('Check whether the payment confirmation step is active', () => {
      cy.get('#Confirmation').should('have.text', 'Confirmation')
    })

    it('Test to rename the description in the amount step', () => {
      cy.xpath("//button[contains(text(), 'Back')]").should('be.visible').click()
      const input = cy.get("textarea[name='description']")
      input.focus().type(' account 001', { log: false }).blur()

      cy.xpath("//button[contains(text(), 'Next')]").should('be.visible').click()
    })

    it('Confirm the payment and Check whether the new payment is success', () => {
      cy.intercept('POST', Cypress.env('paymentUrl')).as('newPayment')

      cy.xpath("//button[contains(text(), 'Confirm')]").should('be.visible').click()

      describe('Check is the new payment get a success', () => {
        cy.wait('@newPayment')
          .its('response.body.message')
          .should(message => {
            console.log(message, 'New Payment Action Status')
            expect(message).to.contain('Successfully created')
          })
      })
    })
  }
}

export default Confirmation
