import { backendUrl } from '.';

export interface Booking {
  bookingDate: string;
  name: string;
  email: string;
  assistants: number;
}

export interface BookingDTO extends Booking {
  id: 7;
  bookingToken: string;
  bookingType: number;
  canceled: boolean;
  creationDate: number;
  expirationDate: number;
  tableId: number;
  userId?: string;
  comment?: string;
  orderId?: string;
}

Cypress.Commands.add('bookTable', (booking: Booking) => {
  cy.request('POST', `${backendUrl}bookingmanagement/v1/booking`, {
    booking,
  })
    .its('body')
    .then((res: BookingDTO) => {
      return res;
    });
});
