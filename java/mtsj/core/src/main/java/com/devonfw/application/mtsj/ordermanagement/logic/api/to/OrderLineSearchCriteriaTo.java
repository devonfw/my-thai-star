package com.devonfw.application.mtsj.ordermanagement.logic.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;

/**
 * used to find {@link com.devonfw.application.mtsj.ordermanagement.common.api.OrderLine}s.
 *
 */
public class OrderLineSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long orderId;

  private Long dishId;

  private Integer amount;

  private String comment;

  private StringSearchConfigTo commentOption;

  /**
   * @return commentOption
   */
  public StringSearchConfigTo getCommentOption() {

    return this.commentOption;
  }

  /**
   * @param commentOption new value of {@link #getcommentOption}.
   */
  public void setCommentOption(StringSearchConfigTo commentOption) {

    this.commentOption = commentOption;
  }

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

  public Long getDishId() {

    return this.dishId;
  }

  public void setDishId(Long dishId) {

    this.dishId = dishId;
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
