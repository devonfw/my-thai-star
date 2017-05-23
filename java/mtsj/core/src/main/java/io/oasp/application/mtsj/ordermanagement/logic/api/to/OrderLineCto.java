package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of OrderLine
 */
public class OrderLineCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderLineEto orderLine;

  private OrderEto order;

  private List<IngredientEto> extras;

  public OrderLineEto getOrderLine() {

    return orderLine;
  }

  public void setOrderLine(OrderLineEto orderLine) {

    this.orderLine = orderLine;
  }

  public OrderEto getOrder() {

    return order;
  }

  public void setOrder(OrderEto order) {

    this.order = order;
  }

  public List<IngredientEto> getExtras() {

    return extras;
  }

  public void setExtras(List<IngredientEto> extras) {

    this.extras = extras;
  }

}
