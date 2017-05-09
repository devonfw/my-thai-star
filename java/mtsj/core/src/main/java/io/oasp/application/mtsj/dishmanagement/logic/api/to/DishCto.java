package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Dish
 */
public class DishCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private DishEto dish;

  public DishEto getDish() {

    return dish;
  }

  public void setDish(DishEto dish) {

    this.dish = dish;
  }

}
