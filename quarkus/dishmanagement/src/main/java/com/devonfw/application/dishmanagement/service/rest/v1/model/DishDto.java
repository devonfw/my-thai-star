package com.devonfw.application.dishmanagement.service.rest.v1.model;

import java.math.BigDecimal;
import java.util.List;

import com.devonfw.application.general.domain.model.AbstractDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Composite transport object of Dish
 */
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DishDto extends AbstractDto {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;
  // TODO- MS communication
  // private ImageEto image;

  private List<IngredientDto> extras;

  private List<CategoryDto> categories;

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
    DishDto other = (DishDto) obj;
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
