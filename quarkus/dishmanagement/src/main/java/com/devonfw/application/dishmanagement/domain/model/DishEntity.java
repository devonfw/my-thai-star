package com.devonfw.application.dishmanagement.domain.model;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.devonfw.application.general.domain.model.ApplicationPersistenceEntity;

/**
 * The {@link com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Dish}.
 */
@Entity
@Table(name = "Dish")
// @Getter
// @Setter
public class DishEntity extends ApplicationPersistenceEntity {

  private String name;

  private String description;

  private BigDecimal price;

  private List<IngredientEntity> extras;

  private List<CategoryEntity> categories;

  /**
   * @return name
   */
  public String getName() {

    return this.name;
  }

  /**
   * @param name new value of {@link #getname}.
   */
  public void setName(String name) {

    this.name = name;
  }

  /**
   * @return description
   */
  public String getDescription() {

    return this.description;
  }

  /**
   * @param description new value of {@link #getdescription}.
   */
  public void setDescription(String description) {

    this.description = description;
  }

  /**
   * @return price
   */
  public BigDecimal getPrice() {

    return this.price;
  }

  /**
   * @param price new value of {@link #getprice}.
   */
  public void setPrice(BigDecimal price) {

    this.price = price;
  }

  /**
   * @return extras
   */
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "DishIngredient", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idIngredient"))
  public List<IngredientEntity> getExtras() {

    return this.extras;
  }

  /**
   * @param extras new value of {@link #getextras}.
   */
  public void setExtras(List<IngredientEntity> extras) {

    this.extras = extras;
  }

  /**
   * @return categories
   */
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "DishCategory", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idCategory"))
  public List<CategoryEntity> getCategories() {

    return this.categories;
  }

  /**
   * @param categories new value of {@link #getcategories}.
   */
  public void setCategories(List<CategoryEntity> categories) {

    this.categories = categories;
  }

}
