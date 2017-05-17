package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Order
 */
public class OrderCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderEto order;

  public OrderEto getOrder() {

    return order;
  }

  public void setOrder(OrderEto order) {

    this.order = order;
  }

}
