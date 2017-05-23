package io.oasp.application.mtsj.ordermanagement.logic.api;

import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Ordermanagement component.
 */
public interface Ordermanagement {

  /**
   * Returns a OrderDishExtraIngredient by its id 'id'.
   *
   * @param id The id 'id' of the OrderDishExtraIngredient.
   * @return The {@link OrderDishExtraIngredientEto} with id 'id'
   */
  OrderDishExtraIngredientEto findOrderDishExtraIngredient(Long id);

  /**
   * Returns a paginated list of OrderDishExtraIngredients matching the search criteria.
   *
   * @param criteria the {@link OrderDishExtraIngredientSearchCriteriaTo}.
   * @return the {@link List} of matching {@link OrderDishExtraIngredientEto}s.
   */
  PaginatedListTo<OrderDishExtraIngredientEto> findOrderDishExtraIngredientEtos(
      OrderDishExtraIngredientSearchCriteriaTo criteria);

  /**
   * Deletes a orderDishExtraIngredient from the database by its id 'orderDishExtraIngredientId'.
   *
   * @param orderDishExtraIngredientId Id of the orderDishExtraIngredient to delete
   * @return boolean <code>true</code> if the orderDishExtraIngredient can be deleted, <code>false</code> otherwise
   */
  boolean deleteOrderDishExtraIngredient(Long orderDishExtraIngredientId);

  /**
   * Saves a orderDishExtraIngredient and store it in the database.
   *
   * @param orderDishExtraIngredient the {@link OrderDishExtraIngredientEto} to create.
   * @return the new {@link OrderDishExtraIngredientEto} that has been saved with ID and version.
   */
  OrderDishExtraIngredientEto saveOrderDishExtraIngredient(OrderDishExtraIngredientEto orderDishExtraIngredient);

  /**
   * Returns a Order by its id 'id'.
   *
   * @param id The id 'id' of the Order.
   * @return The {@link OrderEto} with id 'id'
   */
  OrderEto findOrder(Long id);

  /**
   * Returns a paginated list of Orders matching the search criteria.
   *
   * @param criteria the {@link OrderSearchCriteriaTo}.
   * @return the {@link List} of matching {@link OrderEto}s.
   */
  PaginatedListTo<OrderEto> findOrderEtos(OrderSearchCriteriaTo criteria);

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
  OrderEto saveOrder(OrderEto order);

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
  PaginatedListTo<OrderLineEto> findOrderLineEtos(OrderLineSearchCriteriaTo criteria);

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
