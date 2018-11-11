package com.devonfw.application.mtsj.dishmanagement.logic.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of Category
 */
public class CategoryCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private CategoryEto category;

  public CategoryEto getCategory() {

    return this.category;
  }

  public void setCategory(CategoryEto category) {

    this.category = category;
  }

}
