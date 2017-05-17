package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;
import io.oasp.application.mtsj.reservationmanagement.common.api.datatype.ReservationType;

/**
 * Composite transport object of Reservation
 */
public class ReservationCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ReservationEto reservation;

  private ReservationType reservationType;

  private TableEto table;

  public ReservationEto getReservation() {

    return this.reservation;
  }

  public void setReservation(ReservationEto reservation) {

    this.reservation = reservation;
  }

  public ReservationType getReservationType() {

    return this.reservationType;
  }

  public void setReservationType(ReservationType reservationType) {

    this.reservationType = reservationType;
  }

  public TableEto getTable() {

    return this.table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

}
