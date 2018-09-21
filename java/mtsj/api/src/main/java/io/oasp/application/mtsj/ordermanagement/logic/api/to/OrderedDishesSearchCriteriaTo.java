package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;
import java.sql.Timestamp;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.OrderedDishes}.
 *
 */
public class OrderedDishesSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String type;

  private Timestamp startBookingdate;

  private Timestamp endBookingdate;

  /**
   * The constructor.
   */
  public OrderedDishesSearchCriteriaTo() {

    super();
  }

  public String getType() {

    return this.type;
  }

  public void setType(String type) {

    this.type = type;
  }

  public Timestamp getStartBookingdate() {

    return this.startBookingdate;
  }

  public void setStartBookingdate(Timestamp startBookingdate) {

    this.startBookingdate = startBookingdate;
  }

  public Timestamp getEndBookingdate() {

    return this.endBookingdate;
  }

  public void setEndBookingdate(Timestamp endBookingdate) {

    this.endBookingdate = endBookingdate;
  }

}
