package com.devonfw.app.dishmanagement.common.api.to;

import java.util.List;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of Dish
 */
public class DishCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private DishEto dish;
  // TODO- MS communication
  // private ImageEto image;

  private List<IngredientEto> extras;

  private List<CategoryEto> categories;

  public DishEto getDish() {

    return this.dish;
  }

  public void setDish(DishEto dish) {

    this.dish = dish;
  }

  public List<IngredientEto> getExtras() {

    return this.extras;
  }

  public void setExtras(List<IngredientEto> extras) {

    this.extras = extras;
  }

  public List<CategoryEto> getCategories() {

    return this.categories;
  }

  public void setCategories(List<CategoryEto> categories) {

    this.categories = categories;
  }

}
