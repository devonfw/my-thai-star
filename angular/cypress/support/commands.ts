declare namespace Cypress {
  interface Chainable {
    loginWaiter(): void;
    logout(): void;
    bookTable(): string;
  }
}

Cypress.Commands.add('loginWaiter', () => {
  cy.fixture('waiter.json').then(
    (user: { username: string; password: string }) => {
      cy.get('button[name="login"]').click();
      cy.get('input[name="username"]').type(user.username, { force: true });
      cy.get('input[name="password"]').type(user.password);
      cy.get('button[name="submitLogin"]').click();
      cy.get('snack-bar-container.bgc-green-600').should('exist');
    },
  );
});

Cypress.Commands.add('logout', () => {
  cy.get('button[name="account"]').click();
  cy.get('button[name="logout"]').click();
});
