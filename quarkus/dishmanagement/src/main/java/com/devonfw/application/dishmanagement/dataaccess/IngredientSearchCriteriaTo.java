package com.devonfw.application.dishmanagement.dataaccess;

import java.math.BigDecimal;

import com.devonfw.application.dishmanagement.common.AbstractSearchCriteriaTo;
import com.devonfw.application.dishmanagement.common.StringSearchConfigTo;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Ingredient}s.
 *
 */
@Getter
@Setter
public class IngredientSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  private StringSearchConfigTo nameOption;

  private StringSearchConfigTo descriptionOption;

  /**
   * The constructor.
   */
  public IngredientSearchCriteriaTo() {

    super();
  }

}
