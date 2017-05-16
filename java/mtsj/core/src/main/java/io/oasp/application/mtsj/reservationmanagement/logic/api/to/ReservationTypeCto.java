package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of ReservationType
 */
public class ReservationTypeCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ReservationTypeEto reservationType;

  public ReservationTypeEto getReservationType() {

    return reservationType;
  }

  public void setReservationType(ReservationTypeEto reservationType) {

    this.reservationType = reservationType;
  }

}
