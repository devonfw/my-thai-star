package com.devonfw.application.mtsj.dishmanagement.logic.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of Ingredient
 */
public class IngredientCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private IngredientEto ingredient;

  public IngredientEto getIngredient() {

    return this.ingredient;
  }

  public void setIngredient(IngredientEto ingredient) {

    this.ingredient = ingredient;
  }

}
