package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of OrderLine
 */
public class OrderLineCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderLineEto orderLine;

  private OrderEto order;

  private DishEto dish;

  private List<IngredientEntity> extras;

  public OrderLineEto getOrderLine() {

    return this.orderLine;
  }

  public void setOrderLine(OrderLineEto orderLine) {

    this.orderLine = orderLine;
  }

  public OrderEto getOrder() {

    return this.order;
  }

  public void setOrder(OrderEto order) {

    this.order = order;
  }

  public DishEto getDish() {

    return this.dish;
  }

  public void setDish(DishEto dish) {

    this.dish = dish;
  }

  public List<IngredientEntity> getExtras() {

    return this.extras;
  }

  public void setExtras(List<IngredientEntity> extras) {

    this.extras = extras;
  }

}
