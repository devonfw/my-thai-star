package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.Order}s.
 *
 */
public class OrderSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long idReservation;

  private Long idInvitationGuest;

  /**
   * The constructor.
   */
  public OrderSearchCriteriaTo() {

    super();
  }

  public Long getIdReservation() {

    return idReservation;
  }

  public void setIdReservation(Long idReservation) {

    this.idReservation = idReservation;
  }

  public Long getIdInvitationGuest() {

    return idInvitationGuest;
  }

  public void setIdInvitationGuest(Long idInvitationGuest) {

    this.idInvitationGuest = idInvitationGuest;
  }

}
