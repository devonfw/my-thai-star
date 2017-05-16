package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Reservation
 */
public class ReservationCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ReservationEto reservation;

  private ReservationTypeEto reservationType;

  private TableEto table;

  public ReservationEto getReservation() {

    return reservation;
  }

  public void setReservation(ReservationEto reservation) {

    this.reservation = reservation;
  }

  public ReservationTypeEto getReservationType() {

    return reservationType;
  }

  public void setReservationType(ReservationTypeEto reservationType) {

    this.reservationType = reservationType;
  }

  public TableEto getTable() {

    return table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

}
