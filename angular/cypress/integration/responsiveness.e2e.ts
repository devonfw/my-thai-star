import { mobileHeight, mobileWidth } from '../support';

describe('Testing the responsiveness of the app', () => {
  beforeEach(() => {
    cy.viewport(mobileWidth, mobileHeight);
  });

  it('should change the navbar', () => {
    cy.visit('');
    cy.get('.header-container')
      .should('not.contain', 'div.mat-tab-links');
    // Get hamburger icon
    cy.get('.header-container > .forMobile > .mat-button-wrapper')
      .should('exist');
  });

  it('should have side navbar', () => {
    cy.get('.header-container > .forMobile > .mat-button-wrapper').click();
    cy.get('.mobileSidenav')
      .should('exist');
  });

  it('should display the correct direction for the card list depending on the viewport', () => {
    cy.get('.mobileSidenav')
      .contains('HOME')
      .click();
    // Check the direction of the cards secction on home
    cy.get('#homeCard').should('have.css', 'flex-direction', 'column');
    cy.get('.header-container > .forMobile > .mat-button-wrapper').click();
    cy.get('.mobileSidenav')
      .contains('MENU')
      .click();
    // Check the direction of the cards secction on menu
    cy.get('.details-card').should('have.css', 'flex-direction', 'column');
  });

  it('should have a correct checking cart', () => {
    cy.get('[name="order"]').click();
    // Get checkout cart div
    cy.get('.mat-drawer-inner-container').should('have.css', 'width', `${mobileWidth}px`);
  });

  it('should display orders list after login', () => {
    cy.loginWaiter();
    cy.get('.header-container > .forMobile > .mat-button-wrapper').click();
    cy.get('.mobileSidenav')
    .contains('ORDERS')
    .click();
    cy.get('.tableContainer')
      .should('have.css', 'overflow', 'auto');
  });
  it('should logout', () => {
    cy.logout();
  });
});
