package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of OrderedDishes
 */
public class OrderedDishesCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private DishEto dish;

  private OrderedDishesEto orderedDishes;

  public OrderedDishesEto getOrderedDishes() {

    return this.orderedDishes;
  }

  public void setOrderedDishes(OrderedDishesEto orderedDishes) {

    this.orderedDishes = orderedDishes;
  }

  public DishEto getDish() {

    return this.dish;
  }

  public void setDish(DishEto dish) {

    this.dish = dish;
  }
}
