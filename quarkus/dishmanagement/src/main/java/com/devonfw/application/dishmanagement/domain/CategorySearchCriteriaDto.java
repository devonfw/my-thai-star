package com.devonfw.application.dishmanagement.domain;

import com.devonfw.application.dishmanagement.utils.StringSearchConfigTo;
import com.devonfw.application.general.domain.model.AbstractSearchCriteriaDto;

import lombok.Getter;
import lombok.Setter;

/**
 * used to find {@link com.devonfw.application.mtsj.dishmanagement.common.api.Category}s.
 *
 */
@Getter
@Setter
public class CategorySearchCriteriaDto extends AbstractSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private Integer showOrder;

  private StringSearchConfigTo nameOption;

  private StringSearchConfigTo descriptionOption;

  /**
   * The constructor.
   */
  public CategorySearchCriteriaDto() {

    super();
  }

}
