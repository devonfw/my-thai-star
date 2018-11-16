package com.devonfw.application.mtsj.bookingmanagement.logic.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of InvitedGuest
 */
public class InvitedGuestCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private InvitedGuestEto invitedGuest;

  private BookingEto booking;

  public InvitedGuestEto getInvitedGuest() {

    return this.invitedGuest;
  }

  public void setInvitedGuest(InvitedGuestEto invitedGuest) {

    this.invitedGuest = invitedGuest;
  }

  public BookingEto getBooking() {

    return this.booking;
  }

  public void setBooking(BookingEto booking) {

    this.booking = booking;
  }
}
