package io.oasp.application.mtsj.bookingmanagement.common.api.datatype;

public enum BookingType {
  /** */
  Booking,

  /**  */
  Invited;

  public boolean isInvitedBooking() {

    return (this == Invited);
  }

  public boolean isCommonBooking() {

    return (this == Booking);
  }
}
