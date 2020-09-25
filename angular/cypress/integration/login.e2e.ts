import { url } from '../support';

describe('Testing the login feature', () => {
  it('Login as waiter', () => {
    cy.visit('');
    cy.url().should('eq', `${url}restaurant`);
    cy.loginWaiter();
    cy.url().should('eq', `${url}orders`);
  });

  it('Logout', () => {
    cy.logout();
    cy.url().should('eq', `${url}restaurant`);
  });
});
