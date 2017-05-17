package io.oasp.application.mtsj.reservationmanagement.common.api.datatype;

public enum ReservationType {
  /** */
  Reservation,

  /**  */
  Invitation;

  public boolean isInvitationReservation() {

    return (this == Invitation);
  }

  public boolean isCommonReservation() {

    return (this == Reservation);
  }
}
