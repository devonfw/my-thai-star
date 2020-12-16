describe('Testing the internationalization', () => {
  it('Change from english to spanish', () => {
    cy.visit('');
    cy.get('button[name="language"]').click();
    cy.get('button[name="lang.value"]').contains('Español').click();
    cy.get('span.flag-icon-gb').should('not.exist');
    cy.get('span.flag-icon-es').should('exist');
  });

  it('Change it back to english', () => {
    cy.get('button[name="language"]').click();
    cy.get('button[name="lang.value"]').contains('English').click();
    cy.get('span.flag-icon-es').should('not.exist');
    cy.get('span.flag-icon-gb').should('exist');
  });
});
