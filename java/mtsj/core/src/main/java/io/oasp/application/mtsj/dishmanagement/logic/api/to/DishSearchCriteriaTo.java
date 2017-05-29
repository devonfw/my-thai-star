package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import java.math.BigDecimal;
import java.util.List;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.dishmanagement.common.api.Dish}s.
 *
 */
public class DishSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private List<CategoryEto> categories;

  private BigDecimal maxPrice;

  private int minLikes;

  private String searchBy;

  private int showOrder;

  private boolean isFav;

  /**
   * The constructor.
   */
  public DishSearchCriteriaTo() {

    super();
  }

  /**
   * @return categories
   */
  public List<CategoryEto> getCategories() {

    return this.categories;
  }

  /**
   * @param categories new value of {@link #getCategories}.
   */
  public void setCategories(List<CategoryEto> categories) {

    this.categories = categories;
  }

  /**
   * @return maxPrice
   */
  public BigDecimal getMaxPrice() {

    return this.maxPrice;
  }

  /**
   * @param maxPrice new value of {@link #getMaxPrice}.
   */
  public void setMaxPrice(BigDecimal maxPrice) {

    this.maxPrice = maxPrice;
  }

  /**
   * @return minLikes
   */
  public int getMinLikes() {

    return this.minLikes;
  }

  /**
   * @param minLikes new value of {@link #getMinLikes}.
   */
  public void setMinLikes(int minLikes) {

    this.minLikes = minLikes;
  }

  /**
   * @return searchBy
   */
  public String getSearchBy() {

    return this.searchBy;
  }

  /**
   * @param searchBy new value of {@link #getSearchBy}.
   */
  public void setSearchBy(String searchBy) {

    this.searchBy = searchBy;
  }

  /**
   * @return showOrder
   */
  public int getShowOrder() {

    return this.showOrder;
  }

  /**
   * @param showOrder new value of {@link #getShowOrder}.
   */
  public void setShowOrder(int showOrder) {

    this.showOrder = showOrder;
  }

  /**
   * @return isFav
   */
  public boolean isFav() {

    return this.isFav;
  }

  /**
   * @param isFav new value of {@link #isFav}.
   */
  public void setFav(boolean isFav) {

    this.isFav = isFav;
  }

  // private static final long serialVersionUID = 1L;
  //
  // private String name;
  //
  // private String description;
  //
  // private BigDecimal price;
  //
  // /**
  // * The constructor.
  // */
  // public DishSearchCriteriaTo() {
  //
  // super();
  // }
  //
  // public String getName() {
  //
  // return this.name;
  // }
  //
  // public void setName(String name) {
  //
  // this.name = name;
  // }
  //
  // public String getDescription() {
  //
  // return this.description;
  // }
  //
  // public void setDescription(String description) {
  //
  // this.description = description;
  // }
  //
  // public BigDecimal getPrice() {
  //
  // return this.price;
  // }
  //
  // public void setPrice(BigDecimal price) {
  //
  // this.price = price;
  // }

}
