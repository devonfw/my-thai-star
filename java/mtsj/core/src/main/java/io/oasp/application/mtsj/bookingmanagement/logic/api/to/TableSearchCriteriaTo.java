package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.bookingmanagement.common.api.Table}s.
 */
public class TableSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

  /**
   * The constructor.
   */
  public TableSearchCriteriaTo() {

    super();
  }

  public Integer getSeatsNumber() {

    return seatsNumber;
  }

  public void setSeatsNumber(Integer seatsNumber) {

    this.seatsNumber = seatsNumber;
  }

}
