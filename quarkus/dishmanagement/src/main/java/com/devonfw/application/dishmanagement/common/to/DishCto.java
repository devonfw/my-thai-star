package com.devonfw.application.dishmanagement.common.to;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Composite transport object of Dish
 */
@Getter
@Setter
@ToString
public class DishCto {

  private static final long serialVersionUID = 1L;

  private DishEto dish;
  // TODO- MS communication
  // private ImageEto image;

  private List<IngredientEto> extras;

  private List<CategoryEto> categories;

}
