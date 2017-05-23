package io.oasp.application.mtsj.ordermanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Ordermanagement}.
 */
@Path("/ordermanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface OrdermanagementRestService {

  /**
   * Delegates to {@link Ordermanagement#findOrderDishExtraIngredient}.
   *
   * @param id the ID of the {@link OrderDishExtraIngredientEto}
   * @return the {@link OrderDishExtraIngredientEto}
   */
  @GET
  @Path("/orderdishextraingredient/{id}/")
  public OrderDishExtraIngredientEto getOrderDishExtraIngredient(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#saveOrderDishExtraIngredient}.
   *
   * @param orderdishextraingredient the {@link OrderDishExtraIngredientEto} to be saved
   * @return the recently created {@link OrderDishExtraIngredientEto}
   */
  @POST
  @Path("/orderdishextraingredient/")
  public OrderDishExtraIngredientEto saveOrderDishExtraIngredient(OrderDishExtraIngredientEto orderdishextraingredient);

  /**
   * Delegates to {@link Ordermanagement#deleteOrderDishExtraIngredient}.
   *
   * @param id ID of the {@link OrderDishExtraIngredientEto} to be deleted
   */
  @DELETE
  @Path("/orderdishextraingredient/{id}/")
  public void deleteOrderDishExtraIngredient(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#findOrderDishExtraIngredientEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding orderdishextraingredients.
   * @return the {@link PaginatedListTo list} of matching {@link OrderDishExtraIngredientEto}s.
   */
  @Path("/orderdishextraingredient/search")
  @POST
  public PaginatedListTo<OrderDishExtraIngredientEto> findOrderDishExtraIngredientsByPost(
      OrderDishExtraIngredientSearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Ordermanagement#findOrder}.
   *
   * @param id the ID of the {@link OrderEto}
   * @return the {@link OrderEto}
   */
  @GET
  @Path("/order/{id}/")
  public OrderEto getOrder(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#saveOrder}.
   *
   * @param order the {@link OrderEto} to be saved
   * @return the recently created {@link OrderEto}
   */
  @POST
  @Path("/order/")
  public OrderEto saveOrder(OrderEto order);

  /**
   * Delegates to {@link Ordermanagement#deleteOrder}.
   *
   * @param id ID of the {@link OrderEto} to be deleted
   */
  @DELETE
  @Path("/order/{id}/")
  public void deleteOrder(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#findOrderEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding orders.
   * @return the {@link PaginatedListTo list} of matching {@link OrderEto}s.
   */
  @Path("/order/search")
  @POST
  public PaginatedListTo<OrderEto> findOrdersByPost(OrderSearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Ordermanagement#findOrderLine}.
   *
   * @param id the ID of the {@link OrderLineEto}
   * @return the {@link OrderLineEto}
   */
  @GET
  @Path("/orderline/{id}/")
  public OrderLineEto getOrderLine(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#saveOrderLine}.
   *
   * @param orderline the {@link OrderLineEto} to be saved
   * @return the recently created {@link OrderLineEto}
   */
  @POST
  @Path("/orderline/")
  public OrderLineEto saveOrderLine(OrderLineEto orderline);

  /**
   * Delegates to {@link Ordermanagement#deleteOrderLine}.
   *
   * @param id ID of the {@link OrderLineEto} to be deleted
   */
  @DELETE
  @Path("/orderline/{id}/")
  public void deleteOrderLine(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#findOrderLineEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding orderlines.
   * @return the {@link PaginatedListTo list} of matching {@link OrderLineEto}s.
   */
  @Path("/orderline/search")
  @POST
  public PaginatedListTo<OrderLineEto> findOrderLinesByPost(OrderLineSearchCriteriaTo searchCriteriaTo);

}
