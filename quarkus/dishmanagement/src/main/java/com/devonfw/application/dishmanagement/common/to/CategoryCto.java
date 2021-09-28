package com.devonfw.application.dishmanagement.common.to;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Composite transport object of Category
 */
@Getter
@Setter
@ToString
public class CategoryCto {

  private static final long serialVersionUID = 1L;

  private CategoryEto category;

}
