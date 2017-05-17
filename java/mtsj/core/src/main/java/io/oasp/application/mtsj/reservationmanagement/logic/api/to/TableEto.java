package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.reservationmanagement.common.api.Table;

/**
 * Entity transport object of Table
 */
public class TableEto extends AbstractEto implements Table {

  private static final long serialVersionUID = 1L;

  private int seatsNumber;

  @Override
  public int getSeatsNumber() {

    return seatsNumber;
  }

  @Override
  public void setSeatsNumber(int seatsNumber) {

    this.seatsNumber = seatsNumber;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((Integer) seatsNumber).hashCode();
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    // class check will be done by super type EntityTo!
    if (!super.equals(obj)) {
      return false;
    }
    TableEto other = (TableEto) obj;
    if (this.seatsNumber != other.seatsNumber) {
      return false;
    }
    return true;
  }
}
