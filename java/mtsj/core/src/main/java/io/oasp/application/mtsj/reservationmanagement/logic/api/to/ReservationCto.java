package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Reservation
 */
public class ReservationCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ReservationEto reservation;

  public ReservationEto getReservation() {

    return reservation;
  }

  public void setReservation(ReservationEto reservation) {

    this.reservation = reservation;
  }

}
