import { url, backendUrl } from '../support';
import { BookingDTO } from '../support/booking.commands';

describe('Testing the booking feature', () => {
  let bookingToken: string;

  it('book a table', () => {
    cy.server();
    cy.route('POST', `${backendUrl}bookingmanagement/v1/booking`).as('booking');
    cy.visit('bookTable');
    cy.url().should('eq', `${url}bookTable`);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    cy.get('[formcontrolname="bookingDate"]').type(tomorrow.toISOString());
    cy.get('div.owl-dt-container-buttons > button:nth-child(2)').click();
    cy.get('div.bookTableFormContainer').within(() => {
      cy.get('[formcontrolname="name"]').type('cypress', { force: true });
      cy.get('[formcontrolname="email"]').type('cypress@cypress.com');
      cy.get('[formcontrolname="assistants"]').type('2');
      cy.get('mat-checkbox > label > .mat-checkbox-inner-container').click();
    });
    cy.get('button[name="bookTableSubmit"]').click();
    cy.get('button[name="bookTableConfirm"]').click();
    cy.wait('@booking').then((xhr) => {
      const body = xhr.response.body as BookingDTO;
      assert.isNotNull(body, 'it answers with a booking');
      bookingToken = body.bookingToken;
    });
  });

  it('filter dishes', () => {
    cy.visit('menu');
    cy.url().should('eq', `${url}menu`);
    // Get search dishes input 
    cy.get(`#mat-input-1`).type('peanut');
    cy.get('button[type="submit"]').click();
    cy.get('app-public-menu-card').should('have.length.gte', 1);
    // Clear filters
    cy.get('button.clearFilter').click();
    cy.get('app-public-menu-card').should('have.length.gt', 1);
  });

  it('order dishes with extras and add a comment', () => {
    cy.visit('menu');
    cy.url().should('eq', `${url}menu`);
    // Get search dishes input 
    cy.get(`#mat-input-1`).type('chicken');
    cy.get('button[type="submit"]').click();
    cy.get('app-public-menu-card').should('have.length.gte', 1);
    // Add dish without extras
    cy.get('button.addOrder').click();
    // Go back to the dish
    cy.get('button[name="order"]').click();
    // Add dish with extra
    cy.get(
      'div.extras > mat-checkbox:first-child > label > .mat-checkbox-inner-container',
    ).click();
    cy.get('button.addOrder').click();
    // Add comment to the last dish
    cy.get('label.addOrderComment').last().click();
    cy.get('app-public-comment-dialog').within(() => {
      cy.get(
        'textarea#mat-input-2',
      ).type('I want the dish with the extra please.', { force: true });
      cy.get('button').last().click();
    });
    // Check the pressence of the comment
    cy.get('label.removeOrderComment').should('exist');
    // Add dishes to the previously created order
    cy.get('input[name="orderBookingID"]').type(bookingToken);
    cy.get(
      'mat-checkbox[data-name="orderTerms"] > label > .mat-checkbox-inner-container',
    ).click();
    cy.get('button[name="orderSubmit"]').click();
    // Check that alert is shown
    cy.get('snack-bar-container.bgc-green-600').should('exist');
  });

  it('Invite a friend', () => {
    cy.visit('bookTable');
    cy.url().should('eq', `${url}bookTable`);
    cy.get('div.mat-tab-labels > div[role="tab"]').last().click();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    cy.get('[formcontrolname="bookingDate"]')
      .last()
      .type(tomorrow.toISOString());
    cy.get('div.owl-dt-container-buttons > button:nth-child(2)').click();
    cy.get('div.inviteFriendsFormContainer').within(() => {
      cy.get('[formcontrolname="name"]').type('cypress', { force: true });
      cy.get('[formcontrolname="email"]').type('cypress@cypress.com');
      // Invite 2 friends and remove 1
      cy.get('input.mat-chip-input').type('test1@cypress.com{enter}');
      cy.get('mat-chip[role="option"]').should('have.length', 1);
      cy.get('input.mat-chip-input').type('test2@cypress.com{enter}');
      cy.get('mat-chip[role="option"]').should('have.length', 2);
      cy.get('mat-chip[role="option"]')
        .last()
        .within(() => {
          cy.get('mat-icon').click();
        });
      cy.get('mat-chip[role="option"]').should('have.length', 1);
      cy.get('mat-checkbox > label > .mat-checkbox-inner-container').click();
    });
    cy.get('button[name="inviteFriendsSubmit"]').click();
    cy.get('mat-dialog-container').within(() => {
      cy.get('div.invitedGuests > span').should('contain', 'test1@cypress.com');
      cy.get('button[name="inviteFriendsConfirm"]').click();
    });
    // Check that alert is shown
    cy.get('snack-bar-container.bgc-green-600').should('exist');
  });
});
