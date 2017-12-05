package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import io.oasp.application.mtsj.bookingmanagement.common.api.Table;
import io.oasp.application.mtsj.general.common.api.to.AbstractEto;

/**
 * Entity transport object of Table
 */
public class TableEto extends AbstractEto implements Table {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

  @Override
  public Integer getSeatsNumber() {

    return seatsNumber;
  }

  @Override
  public void setSeatsNumber(Integer seatsNumber) {

    this.seatsNumber = seatsNumber;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.seatsNumber == null) ? 0 : this.seatsNumber.hashCode());
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
    if (this.seatsNumber == null) {
      if (other.seatsNumber != null) {
        return false;
      }
    } else if (!this.seatsNumber.equals(other.seatsNumber)) {
      return false;
    }
    return true;
  }

}
