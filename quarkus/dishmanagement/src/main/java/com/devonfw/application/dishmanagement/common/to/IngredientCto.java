package com.devonfw.application.dishmanagement.common.to;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Composite transport object of Ingredient
 */
@Getter
@Setter
@ToString
public class IngredientCto {

  private static final long serialVersionUID = 1L;

  private IngredientEto ingredient;

}
