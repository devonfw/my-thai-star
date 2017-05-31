package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;

/**
 * Object to map the filters used in 'see all orders' User Story. The filters are not related directly with
 * {@link OrderEntity}. This object maps the internal fields of the {@link OrderCto} that are used in filters.
 *
 */
public class OrderFilterCriteria {

  private String email;

  /**
   * @return email
   */
  public String getEmail() {

    return this.email;
  }

  /**
   * @param email new value of {@link #getemail}.
   */
  public void setEmail(String email) {

    this.email = email;
  }

}
