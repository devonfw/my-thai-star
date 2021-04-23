package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of OrderState
 */
public class OrderStateCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderStateEto orderState;

  public OrderStateEto getOrderState() {

    return orderState;
  }

  public void setOrderState(OrderStateEto orderState) {

    this.orderState = orderState;
  }

}
