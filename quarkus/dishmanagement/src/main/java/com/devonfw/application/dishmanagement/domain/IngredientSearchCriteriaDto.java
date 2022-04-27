package com.devonfw.application.dishmanagement.domain;

import java.math.BigDecimal;

import com.devonfw.application.dishmanagement.utils.StringSearchConfigTo;
import com.devonfw.application.general.domain.model.AbstractSearchCriteriaDto;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Ingredient}s.
 *
 */
@Getter
@Setter
public class IngredientSearchCriteriaDto extends AbstractSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  private StringSearchConfigTo nameOption;

  private StringSearchConfigTo descriptionOption;

  /**
   * The constructor.
   */
  public IngredientSearchCriteriaDto() {

    super();
  }

}
