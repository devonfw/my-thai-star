package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.Order}s.
 *
 */
public class OrderSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long idBooking;

  private Long idInvitedGuest;

  /**
   * The constructor.
   */
  public OrderSearchCriteriaTo() {

    super();
  }

  public Long getIdBooking() {

    return idBooking;
  }

  public void setIdBooking(Long idBooking) {

    this.idBooking = idBooking;
  }

  public Long getIdInvitedGuest() {

    return idInvitedGuest;
  }

  public void setIdInvitedGuest(Long idInvitedGuest) {

    this.idInvitedGuest = idInvitedGuest;
  }

}
