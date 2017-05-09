package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import io.oasp.application.mtsj.dishmanagement.common.api.Dish;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Dish}.
 */
@Entity
@Table(name = "Dish")
public class DishEntity extends ApplicationPersistenceEntity implements Dish {

  private String name;

  private String description;

  private BigDecimal price;

  private String image;

  private List<Ingredient> extras;

  private Collection<Category> categories;

  private static final long serialVersionUID = 1L;

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
   * @return image
   */
  public String getImage() {

    return this.image;
  }

  /**
   * @param image new value of {@link #getimage}.
   */
  public void setImage(String image) {

    this.image = image;
  }

  /**
   * @return extras
   */
  @ManyToMany(fetch = FetchType.EAGER)
  @Column(name = "idIngredient")
  @JoinTable(name = "DishIngredient", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idIngredient"))
  public List<Ingredient> getExtras() {

    return this.extras;
  }

  /**
   * @param extras new value of {@link #getextras}.
   */
  public void setExtras(List<Ingredient> extras) {

    this.extras = extras;
  }

  /**
   * @return categories
   */
  @ManyToMany(fetch = FetchType.EAGER)
  @Column(name = "idCategory")
  @JoinTable(name = "DishCategory", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idCategory"))
  public Collection<Category> getCategories() {

    return this.categories;
  }

  /**
   * @param categories new value of {@link #getcategories}.
   */
  public void setCategories(Collection<Category> categories) {

    this.categories = categories;
  }

}
