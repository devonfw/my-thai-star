package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * Object to map the filters used in 'see all orders' User Story. The filters are not related directly with
 * {@link OrderEntity}. This object maps the internal fields of the {@link OrderCto} that are used in filters.
 *
 */
public class OrderFilterCriteria extends SearchCriteriaTo {

  private String email;

  private String bookingToken;

  /**
   * @return email
   */
  public String getEmail() {

    return this.email;
  }

  /**
   * @param email new value of {@link #getEmail}.
   */
  public void setEmail(String email) {

    this.email = email;
  }

  /**
   * @return bookingToken
   */
  public String getBookingToken() {

    return this.bookingToken;
  }

  /**
   * @param bookingToken new value of {@link #getBookingToken}.
   */
  public void setBookingToken(String bookingToken) {

    this.bookingToken = bookingToken;
  }

}
