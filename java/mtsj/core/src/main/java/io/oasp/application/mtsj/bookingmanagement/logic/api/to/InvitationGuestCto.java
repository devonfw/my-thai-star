package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of InvitationGuest
 */
public class InvitationGuestCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private InvitationGuestEto invitationGuest;

  private BookingEto booking;

  public InvitationGuestEto getInvitationGuest() {

    return this.invitationGuest;
  }

  public void setInvitationGuest(InvitationGuestEto invitationGuest) {

    this.invitationGuest = invitationGuest;
  }

  public BookingEto getBooking() {

    return this.booking;
  }

  public void setBooking(BookingEto booking) {

    this.booking = booking;
  }

}
