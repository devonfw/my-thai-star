package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Dish
 */
public class DishCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private DishEto dish;

  /**
   * @return dish
   */
  public DishEto getDish() {

    return this.dish;
  }

  /**
   * @param dish the dish to set
   */
  public void setDish(DishEto dish) {

    this.dish = dish;
  }

}
