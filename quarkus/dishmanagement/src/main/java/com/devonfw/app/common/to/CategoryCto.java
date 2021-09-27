package com.devonfw.app.common.to;

import com.devonfw.app.common.AbstractTo;

/**
 * Composite transport object of Category
 */
public class CategoryCto extends AbstractTo {

  private static final long serialVersionUID = 1L;

  private CategoryEto category;

  public CategoryEto getCategory() {

    return this.category;
  }

  public void setCategory(CategoryEto category) {

    this.category = category;
  }

}
