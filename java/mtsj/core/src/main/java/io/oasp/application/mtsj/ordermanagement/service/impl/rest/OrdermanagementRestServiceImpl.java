package io.oasp.application.mtsj.ordermanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.service.api.rest.OrdermanagementRestService;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Ordermanagement}.
 */
@Named("OrdermanagementRestService")
public class OrdermanagementRestServiceImpl implements OrdermanagementRestService {

  @Inject
  private Ordermanagement ordermanagement;

  @Override
  public OrderEto getOrder(long id) {

    return this.ordermanagement.findOrder(id);
  }

  @Override
  public OrderEto saveOrder(OrderEto order) {

    return this.ordermanagement.saveOrder(order);
  }

  @Override
  public void deleteOrder(long id) {

    this.ordermanagement.deleteOrder(id);
  }

  @Override
  public PaginatedListTo<OrderEto> findOrdersByPost(OrderSearchCriteriaTo searchCriteriaTo) {

    return this.ordermanagement.findOrderEtos(searchCriteriaTo);
  }

  @Override
  public OrderLineEto getOrderLine(long id) {

    return this.ordermanagement.findOrderLine(id);
  }

  @Override
  public OrderLineEto saveOrderLine(OrderLineEto orderline) {

    return this.ordermanagement.saveOrderLine(orderline);
  }

  @Override
  public void deleteOrderLine(long id) {

    this.ordermanagement.deleteOrderLine(id);
  }

  @Override
  public PaginatedListTo<OrderLineEto> findOrderLinesByPost(OrderLineSearchCriteriaTo searchCriteriaTo) {

    return this.ordermanagement.findOrderLineEtos(searchCriteriaTo);
  }

}
