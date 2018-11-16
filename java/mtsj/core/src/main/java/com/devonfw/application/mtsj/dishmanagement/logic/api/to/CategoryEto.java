package com.devonfw.application.mtsj.dishmanagement.logic.api.to;

import com.devonfw.application.mtsj.dishmanagement.common.api.Category;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of Category
 */
public class CategoryEto extends AbstractEto implements Category {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private int showOrder;

  @Override
  public String getName() {

    return this.name;
  }

  @Override
  public void setName(String name) {

    this.name = name;
  }

  @Override
  public String getDescription() {

    return this.description;
  }

  @Override
  public void setDescription(String description) {

    this.description = description;
  }

  @Override
  public int getShowOrder() {

    return this.showOrder;
  }

  @Override
  public void setShowOrder(int showOrder) {

    this.showOrder = showOrder;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
    result = prime * result + ((Integer) this.showOrder).hashCode();
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    // class check will be done by super type EntityTo!
    if (!super.equals(obj)) {
      return false;
    }
    CategoryEto other = (CategoryEto) obj;
    if (this.name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (!this.name.equals(other.name)) {
      return false;
    }
    if (this.description == null) {
      if (other.description != null) {
        return false;
      }
    } else if (!this.description.equals(other.description)) {
      return false;
    }
    if (this.showOrder != other.showOrder) {
      return false;
    }
    return true;
  }
}
