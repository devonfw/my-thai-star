package io.oasp.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.ordermanagement.common.api.Order;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Order}.
 */
@Entity
@Table(name = "Orders")
public class OrderEntity extends ApplicationPersistenceEntity implements Order {

  private static final long serialVersionUID = 1L;

  private Long idBooking;

  private Long idInvitedGuest;

  /**
   * @return idReservation
   */
  public Long getIdBooking() {

    return this.idBooking;
  }

  /**
   * @param idBooking new value of {@link #getIdBooking}.
   */
  public void setIdBooking(Long idBooking) {

    this.idBooking = idBooking;
  }

  /**
   * @return idInvitedGuest
   */
  public Long getIdInvitedGuest() {

    return this.idInvitedGuest;
  }

  /**
   * @param idInvitedGuest new value of {@link #getIdInvitedGuest}.
   */
  public void setIdInvitedGuest(Long idInvitedGuest) {

    this.idInvitedGuest = idInvitedGuest;
  }

}
