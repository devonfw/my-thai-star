import { url, backendUrl, data } from '../support';
import { BookingDTO } from '../support/booking.commands';

describe('Testing the booking feature', () => {
  it('book a table', () => {
    cy.server();
    cy.route('POST', `${backendUrl}bookingmanagement/v1/booking`).as('booking');
    cy.visit('/bookTable');
    cy.url().should('eq', `${url}/bookTable`);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    cy.get('[formcontrolname="bookingDate"]').type(tomorrow.toISOString());
    cy.get('div.owl-dt-container-buttons > button:nth-child(2)').click();
    cy.get('[formcontrolname="name"]').type('cypress', { force: true });
    cy.get('[formcontrolname="email"]').type('cypress@cypress.com');
    cy.get('[formcontrolname="assistants"]').type('2');
    cy.get('.mat-checkbox-inner-container').click({
      force: true,
      multiple: true,
    });
    cy.get('button[name="bookTableSubmit"]').click();
    cy.get('button[name="bookTableConfirm"]').click();
    cy.wait('@booking').then((xhr) => {
      const body = xhr.response.body as BookingDTO;
      assert.isNotNull(body, 'it answers with a booking');
      data.bookingToken = body.bookingToken;
    });
  });
});
