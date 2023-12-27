/// <reference types="cypress" />

class Amount {
  amount() {
    it('Input the amount: [ 5 ] to get quote', () => {
      const input = cy.get("input[id='number']")
      input.focus().type('5', { log: false }).blur()
    })

    it('Input the description: [ Cypress test ]', () => {
      const input = cy.get("textarea[name='description']")
      input.focus().type('Cypress test', { log: false }).blur()
    })

    // it("Check if the quote is received", () => {
    //   cy.wait(2000)
    //     .get(".progressLine-module--Sgorb")
    //     .should("not.be.an", undefined);
    // });

    it('Click the next button to view the overall payment summary', () => {
      cy.wait(3500).xpath("//button[contains(text(), 'Next')]").should('be.visible').click()
    })
  }
}

export default Amount
