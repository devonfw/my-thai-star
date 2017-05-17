package io.oasp.application.mtsj.bookingmanagement.common.api.datatype;

public enum BookingType {
  /** */
  Booking,

  /**  */
  Invitation;

  public boolean isInvitationBooking() {

    return (this == Invitation);
  }

  public boolean isCommonBooking() {

    return (this == Booking);
  }
}
