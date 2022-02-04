package com.devonfw.application.dishmanagement.domain;

import java.math.BigDecimal;
import java.util.List;

import com.devonfw.application.dishmanagement.service.rest.v1.model.CategoryDto;
import com.devonfw.application.dishmanagement.utils.StringSearchConfigTo;
import com.devonfw.application.general.domain.model.AbstractSearchCriteriaDto;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Dish}s.
 *
 */
@Getter
@Setter
public class DishSearchCriteriaDto extends AbstractSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private List<CategoryDto> categories;

  private BigDecimal maxPrice;

  private int minLikes;

  private String searchBy;

  private int showOrder;

  private boolean isFav;

  private StringSearchConfigTo searchByOption;

  /**
   * The constructor.
   */
  public DishSearchCriteriaDto() {

    super();
  }

}
