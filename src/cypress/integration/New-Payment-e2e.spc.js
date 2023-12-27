// import LoginPage from "../ui-pages/Login";
// import Accounts from "../ui-pages/Steps/Accounts";
// import Beneficiaries from "../ui-pages/Steps/Beneficiaries";
// import Amount from "../ui-pages/Steps/Amount";
// import Confirmation from "../ui-pages/Steps/Confirmation";

// const login = new LoginPage();
// const accounts = new Accounts();
// const beneficiaries = new Beneficiaries();
// const amount = new Amount();
// const confirmation = new Confirmation();

// context("New Payment e2e", () => {
// it("Visit to login page", () => {
//   cy.visit(Cypress.env("baseUrl") + "/login");
//   login.redirectLoginPage("cms");
// });
// it("Enter username and password", () => {
//   login.enterEmail(Cypress.env("username"));
//   login.enterPassword(Cypress.env("password"));
// });
// it("Confirm Login and select an entity", () => {
//   login.clickLoginButton();
// });
// it("Upon user authorization, visit to payment dashboard", () => {
//   login.isUserAuthorized();
//   cy.wait(1000);
// });
// accounts.accounts();
// beneficiaries.beneficiaries();
// amount.amount();
// confirmation.confirmation();
// });
