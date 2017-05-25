package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.OrderLine}s.
 *
 */
public class OrderLineSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long orderId;

  private Long dishId;

  private Integer amount;

  private String comment;

  /**
   * The constructor.
   */
  public OrderLineSearchCriteriaTo() {

    super();
  }

  public Long getOrderId() {

    return orderId;
  }

  public void setOrderId(Long orderId) {

    this.orderId = orderId;
  }

  public Long getDishId() {

    return dishId;
  }

  public void setDishId(Long dishId) {

    this.dishId = dishId;
  }

  public Integer getAmount() {

    return amount;
  }

  public void setAmount(Integer amount) {

    this.amount = amount;
  }

  public String getComment() {

    return comment;
  }

  public void setComment(String comment) {

    this.comment = comment;
  }

}
