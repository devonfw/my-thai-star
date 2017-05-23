package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.ordermanagement.common.api.Order;

/**
 * Entity transport object of Order
 */
public class OrderEto extends AbstractEto implements Order {

  private static final long serialVersionUID = 1L;

  private Long idBooking;

  private Long idInvitedGuest;

  @Override
  public Long getIdBooking() {

    return idBooking;
  }

  @Override
  public void setIdBooking(Long idBooking) {

    this.idBooking = idBooking;
  }

  @Override
  public Long getIdInvitedGuest() {

    return idInvitedGuest;
  }

  @Override
  public void setIdInvitedGuest(Long idInvitedGuest) {

    this.idInvitedGuest = idInvitedGuest;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.idBooking == null) ? 0 : this.idBooking.hashCode());
    result = prime * result + ((this.idInvitedGuest == null) ? 0 : this.idInvitedGuest.hashCode());
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
    OrderEto other = (OrderEto) obj;
    if (this.idBooking == null) {
      if (other.idBooking != null) {
        return false;
      }
    } else if (!this.idBooking.equals(other.idBooking)) {
      return false;
    }
    if (this.idInvitedGuest == null) {
      if (other.idInvitedGuest != null) {
        return false;
      }
    } else if (!this.idInvitedGuest.equals(other.idInvitedGuest)) {
      return false;
    }
    return true;
  }
}
