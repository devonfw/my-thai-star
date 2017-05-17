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

  private Long idReservation;

  private Long idInvitationGuest;

  /**
   * @return idReservation
   */
  public Long getIdReservation() {

    return this.idReservation;
  }

  /**
   * @param idReservation new value of {@link #getIdReservation}.
   */
  public void setIdReservation(Long idReservation) {

    this.idReservation = idReservation;
  }

  /**
   * @return idInvitationGuest
   */
  public Long getIdInvitationGuest() {

    return this.idInvitationGuest;
  }

  /**
   * @param idInvitationGuest new value of {@link #getIdInvitationGuest}.
   */
  public void setIdInvitationGuest(Long idInvitationGuest) {

    this.idInvitationGuest = idInvitationGuest;
  }

}
