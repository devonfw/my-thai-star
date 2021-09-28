package com.devonfw.application.dishmanagement.common.to;

import java.math.BigDecimal;

import com.devonfw.application.dishmanagement.common.AbstractEto;

import lombok.Getter;
import lombok.Setter;

/**
 * Entity transport object of Dish
 */
@Getter
@Setter
public class DishEto extends AbstractEto {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  // private Long imageId;

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
    result = prime * result + ((this.price == null) ? 0 : this.price.hashCode());
    // result = prime * result + ((this.imageId == null) ? 0 : this.imageId.hashCode());

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
    DishEto other = (DishEto) obj;
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
    if (this.price == null) {
      if (other.price != null) {
        return false;
      }
    } else if (!this.price.equals(other.price)) {
      return false;
    }
    // if (this.imageId == null) {
    // if (other.imageId != null) {
    // return false;
    // }
    // } else if (!this.imageId.equals(other.imageId)) {
    // return false;
    // }

    return true;
  }
}
