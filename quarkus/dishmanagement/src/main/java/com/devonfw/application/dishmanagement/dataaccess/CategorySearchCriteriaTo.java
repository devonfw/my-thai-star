package com.devonfw.application.dishmanagement.dataaccess;

import com.devonfw.application.dishmanagement.common.AbstractSearchCriteriaTo;
import com.devonfw.application.dishmanagement.common.StringSearchConfigTo;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Category}s.
 *
 */
@Getter
@Setter
public class CategorySearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private Integer showOrder;

  private StringSearchConfigTo nameOption;

  private StringSearchConfigTo descriptionOption;

  /**
   * The constructor.
   */
  public CategorySearchCriteriaTo() {

    super();
  }

}
