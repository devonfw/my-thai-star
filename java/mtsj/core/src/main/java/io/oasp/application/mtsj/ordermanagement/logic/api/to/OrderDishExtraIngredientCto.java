package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of OrderDishExtraIngredient
 */
public class OrderDishExtraIngredientCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderDishExtraIngredientEto orderDishExtraIngredient;

  public OrderDishExtraIngredientEto getOrderDishExtraIngredient() {

    return orderDishExtraIngredient;
  }

  public void setOrderDishExtraIngredient(OrderDishExtraIngredientEto orderDishExtraIngredient) {

    this.orderDishExtraIngredient = orderDishExtraIngredient;
  }

}
