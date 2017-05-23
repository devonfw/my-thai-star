package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Booking
 */
public class BookingCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private BookingEto booking;

  private TableEto table;

  private List<InvitedGuestEto> invitedGuests;

  public BookingEto getBooking() {

    return booking;
  }

  public void setBooking(BookingEto booking) {

    this.booking = booking;
  }

  public TableEto getTable() {

    return table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

  public List<InvitedGuestEto> getInvitedGuests() {

    return invitedGuests;
  }

  public void setInvitedGuests(List<InvitedGuestEto> invitedGuests) {

    this.invitedGuests = invitedGuests;
  }

}
