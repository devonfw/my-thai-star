import { url } from '../support';

describe('Testing the header navigation', () => {
  it('click on menu', () => {
    cy.visit('');
    cy.get('div.mat-tab-links > a[routerlink="/menu"]').click();
    cy.url().should('eq', `${url}menu`);
  });

  it('click on book table', () => {
    cy.get('div.mat-tab-links > a[routerlink="/bookTable"]').click();
    cy.url().should('eq', `${url}bookTable`);
  });

  it('click on home', () => {
    cy.get('div.mat-tab-links > a[routerlink="/restaurant"]').click();
    cy.url().should('eq', `${url}restaurant`);
  });
});
