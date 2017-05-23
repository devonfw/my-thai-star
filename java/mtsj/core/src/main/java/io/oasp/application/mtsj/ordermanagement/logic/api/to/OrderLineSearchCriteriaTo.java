package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.OrderLine}s.
 *
 */
public class OrderLineSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long orderId;

  private Long idDish;

  private List<Ingredient> extras;

  private Integer amount;

  private String comment;

  /**
   * The constructor.
   */
  public OrderLineSearchCriteriaTo() {

    super();
  }

  public Long getOrderId() {

    return this.orderId;
  }

  public void setOrderId(Long orderId) {

    this.orderId = orderId;
  }

  public Long getIdDish() {

    return this.idDish;
  }

  public void setIdDish(Long idDish) {

    this.idDish = idDish;
  }

  public List<Ingredient> getExtras() {

    return this.extras;
  }

  public void setExtras(List<Ingredient> extras) {

    this.extras = extras;
  }

  public Integer getAmount() {

    return this.amount;
  }

  public void setAmount(Integer amount) {

    this.amount = amount;
  }

  public String getComment() {

    return this.comment;
  }

  public void setComment(String comment) {

    this.comment = comment;
  }

}
