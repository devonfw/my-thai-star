package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.ordermanagement.common.api.OrderDishExtraIngredient}s.
 *
 */
public class OrderDishExtraIngredientSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long idOrderLine;

  private Long idIngredient;

  /**
   * The constructor.
   */
  public OrderDishExtraIngredientSearchCriteriaTo() {

    super();
  }

  public Long getIdOrderLine() {

    return idOrderLine;
  }

  public void setIdOrderLine(Long idOrderLine) {

    this.idOrderLine = idOrderLine;
  }

  public Long getIdIngredient() {

    return idIngredient;
  }

  public void setIdIngredient(Long idIngredient) {

    this.idIngredient = idIngredient;
  }

}
