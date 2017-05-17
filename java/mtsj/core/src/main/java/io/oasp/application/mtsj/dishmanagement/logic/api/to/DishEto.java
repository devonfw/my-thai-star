package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import java.math.BigDecimal;
import java.util.List;

import io.oasp.application.mtsj.dishmanagement.common.api.Dish;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.imagemanagement.common.api.Image;

/**
 * Entity transport object of Dish
 */
public class DishEto extends AbstractEto implements Dish {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  private Image image;

  private List<Ingredient> extras;

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
  public BigDecimal getPrice() {

    return this.price;
  }

  @Override
  public void setPrice(BigDecimal price) {

    this.price = price;
  }

  @Override
  public List<Ingredient> getExtras() {

    return this.extras;
  }

  @Override
  public void setExtras(List<Ingredient> extras) {

    this.extras = extras;
  }

  public Image getImage() {

    return this.image;
  }

  public void setImage(Image image) {

    this.image = image;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.description == null) ? 0 : this.description.hashCode());
    result = prime * result + ((this.price == null) ? 0 : this.price.hashCode());
    result = prime * result + ((this.image == null) ? 0 : this.image.hashCode());
    result = prime * result + ((this.extras == null) ? 0 : this.extras.hashCode());
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
    if (this.image == null) {
      if (other.image != null) {
        return false;
      }
    } else if (!this.image.equals(other.image)) {
      return false;
    }
    if (this.extras == null) {
      if (other.extras != null) {
        return false;
      }
    } else if (!this.extras.equals(other.extras)) {
      return false;
    }

    return true;
  }

}
