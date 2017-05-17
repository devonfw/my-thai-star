package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.ordermanagement.common.api.Order;

/**
 * Entity transport object of Order
 */
public class OrderEto extends AbstractEto implements Order {

  private static final long serialVersionUID = 1L;

  private Long idReservation;

  private Long idInvitationGuest;

  @Override
  public Long getIdReservation() {

    return idReservation;
  }

  @Override
  public void setIdReservation(Long idReservation) {

    this.idReservation = idReservation;
  }

  @Override
  public Long getIdInvitationGuest() {

    return idInvitationGuest;
  }

  @Override
  public void setIdInvitationGuest(Long idInvitationGuest) {

    this.idInvitationGuest = idInvitationGuest;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.idReservation == null) ? 0 : this.idReservation.hashCode());
    result = prime * result + ((this.idInvitationGuest == null) ? 0 : this.idInvitationGuest.hashCode());
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
    if (this.idReservation == null) {
      if (other.idReservation != null) {
        return false;
      }
    } else if (!this.idReservation.equals(other.idReservation)) {
      return false;
    }
    if (this.idInvitationGuest == null) {
      if (other.idInvitationGuest != null) {
        return false;
      }
    } else if (!this.idInvitationGuest.equals(other.idInvitationGuest)) {
      return false;
    }
    return true;
  }
}
