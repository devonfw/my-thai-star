import { url } from '../support';

describe('Testing the reservations feature', () => {
  it('should not be able to access without credentials', () => {
    cy.visit('reservations');
    cy.url().should('eq', `${url}`);
    cy.get('snack-bar-container.bgc-red-600').should('exist');
  });

  it('should login as waiter', () => {
    cy.loginWaiter();
    cy.url().should('eq', `${url}orders`);
  });

  it('should see the full list of reservations', () => {
    cy.get('div.mat-tab-links > a[routerlink="/reservations"]').click();
    cy.url().should('eq', `${url}reservations`);
    cy.get('div.tableContainer > table > tbody > tr').should(
      'have.length.gt',
      0,
    );
    // Change page size
    cy.get('mat-select#mat-select-1').click();
    cy.get('mat-option').last().click();
    cy.get('mat-select#mat-select-1 .mat-select-value-text > span').contains(
      '24',
    );
    // Put back the original page size
    cy.get('mat-select#mat-select-1').click();
    cy.get('mat-option').first().click();
    cy.get('mat-select#mat-select-1 .mat-select-value-text > span').contains(
      '8',
    );
    cy.get('mat-expansion-panel[data-name="reservationFilter"]').click();
    // Test filtering with email
    cy.get('div.formDesktopRow input[name="email"]')
      .last()
      .type('cypress@cypress.com');
    cy.get('button[name="reservationApplyFilters"]').click();
    cy.get('div.tableContainer > table > tbody > tr').should(
      'have.length.gte',
      1,
    );
    cy.get('button[name="reservationsClearFilters"]').click();
    // Test filtering with reference number
    cy.get('div.formDesktopRow input[name="bookingToken"]')
      .last()
      .type('NO_RESULTS');
    cy.get('button[name="reservationApplyFilters"]').click();
    cy.get('div.tableContainer > table > tbody > tr').should('have.length', 0);
    cy.get('button[name="reservationsClearFilters"]').click();
  });

  it('should see the full detail of a reservation', () => {
    let referenceNumber = '';
    const firstRow = cy.get('div.tableContainer > table > tbody > tr').first();
    firstRow.within(() => {
      cy.get('td')
        .last()
        .should(($el) => {
          referenceNumber = $el.text();
        });
    });
    firstRow.click();
    cy.get('#mat-dialog-title-0').should(
      'contain',
      referenceNumber,
    );
    cy.get( 'button')
    .contains('CLOSE')
    .click();
  });

  it('should logout', () => {
    cy.logout();
    cy.url().should('eq', `${url}restaurant`);
  });
});
