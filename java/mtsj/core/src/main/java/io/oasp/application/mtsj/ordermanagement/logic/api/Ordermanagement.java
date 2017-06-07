package io.oasp.application.mtsj.ordermanagement.logic.api;

import java.util.List;

import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderCto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderFilterCriteria;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineCto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Ordermanagement component.
 */
public interface Ordermanagement {

  /**
   * Returns a Order by its id 'id'.
   *
   * @param id The id 'id' of the Order.
   * @return The {@link OrderEto} with id 'id'
   */
  OrderCto findOrder(Long id);

  /**
   * Returns a paginated list of Orders matching the search criteria. Needs Authorization.
   *
   * @param criteria the {@link OrderSearchCriteriaTo}.
   * @return the {@link List} of matching {@link OrderCto}s.
   */
  PaginatedListTo<OrderCto> findOrdersByPost(OrderSearchCriteriaTo criteria);

  /**
   * Returns a paginated list of Orders matching the search criteria.
   *
   * @param criteria the {@link OrderSearchCriteriaTo}.
   * @return the {@link List} of matching {@link OrderCto}s.
   */
  PaginatedListTo<OrderCto> findOrderCtos(OrderSearchCriteriaTo criteria);

  /**
   * Returns a paginated list of Orders matching the filter criteria.
   *
   * @param criteria the {@link OrderFilterCriteria}.
   * @return the {@link List} of matching {@link OrderCto}s.
   */
  PaginatedListTo<OrderCto> filterOrderCtos(OrderFilterCriteria criteria);

  /**
   * Deletes a order from the database by its id 'orderId'.
   *
   * @param orderId Id of the order to delete
   * @return boolean <code>true</code> if the order can be deleted, <code>false</code> otherwise
   */
  boolean deleteOrder(Long orderId);

  /**
   * Saves a order and store it in the database.
   *
   * @param order the {@link OrderEto} to create.
   * @return the new {@link OrderEto} that has been saved with ID and version.
   */
  OrderEto saveOrder(OrderCto order);

  /**
   * Returns a OrderLine by its id 'id'.
   *
   * @param id The id 'id' of the OrderLine.
   * @return The {@link OrderLineEto} with id 'id'
   */
  OrderLineEto findOrderLine(Long id);

  /**
   * Returns a paginated list of OrderLines matching the search criteria.
   *
   * @param criteria the {@link OrderLineSearchCriteriaTo}.
   * @return the {@link List} of matching {@link OrderLineEto}s.
   */
  // PaginatedListTo<OrderLineEto> findOrderLineEtos(OrderLineSearchCriteriaTo criteria);
  PaginatedListTo<OrderLineCto> findOrderLineCtos(OrderLineSearchCriteriaTo criteria);

  /**
   * Deletes a orderLine from the database by its id 'orderLineId'.
   *
   * @param orderLineId Id of the orderLine to delete
   * @return boolean <code>true</code> if the orderLine can be deleted, <code>false</code> otherwise
   */
  boolean deleteOrderLine(Long orderLineId);

  /**
   * Saves a orderLine and store it in the database.
   *
   * @param orderLine the {@link OrderLineEto} to create.
   * @return the new {@link OrderLineEto} that has been saved with ID and version.
   */
  OrderLineEto saveOrderLine(OrderLineEto orderLine);

}
