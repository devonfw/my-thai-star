package com.devonfw.application.dishmanagement.dataaccess;

import java.math.BigDecimal;
import java.util.List;

import com.devonfw.application.dishmanagement.common.AbstractSearchCriteriaTo;
import com.devonfw.application.dishmanagement.common.StringSearchConfigTo;
import com.devonfw.application.dishmanagement.common.to.CategoryEto;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Dish}s.
 *
 */
@Getter
@Setter
public class DishSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private List<CategoryEto> categories;

  private BigDecimal maxPrice;

  private int minLikes;

  private String searchBy;

  private int showOrder;

  private boolean isFav;

  private StringSearchConfigTo searchByOption;

  /**
   * The constructor.
   */
  public DishSearchCriteriaTo() {

    super();
  }

}
