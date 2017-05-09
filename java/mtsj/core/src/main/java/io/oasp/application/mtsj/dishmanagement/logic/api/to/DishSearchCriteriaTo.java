package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.dishmanagement.common.api.Dish}s.
 */
public class DishSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  private String image;

  private List<Ingredient> extras;

  private Collection<Category> categories;

  /**
   * The constructor.
   */
  public DishSearchCriteriaTo() {

    super();
  }

  public String getName() {

    return this.name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public String getDescription() {

    return this.description;
  }

  public void setDescription(String description) {

    this.description = description;
  }

  public BigDecimal getPrice() {

    return this.price;
  }

  public void setPrice(BigDecimal price) {

    this.price = price;
  }

  public String getImage() {

    return this.image;
  }

  public void setImage(String image) {

    this.image = image;
  }

  public List<Ingredient> getExtras() {

    return this.extras;
  }

  public void setExtras(List<Ingredient> extras) {

    this.extras = extras;
  }

  public Collection<Category> getCategories() {

    return this.categories;
  }

  public void setCategories(Collection<Category> categories) {

    this.categories = categories;
  }

}
