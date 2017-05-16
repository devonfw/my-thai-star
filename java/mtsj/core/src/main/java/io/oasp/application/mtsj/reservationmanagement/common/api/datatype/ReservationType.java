package io.oasp.application.mtsj.reservationmanagement.common.api.datatype;

/**
 * @author rudiazma
 *
 */
public enum ReservationType {
  /** */
  CRS,

  /**  */
  GRS;

  public boolean isInvitationReservation() {

    return (this == GRS);
  }

  public boolean isCommonReservation() {

    return (this == CRS);
  }
}
