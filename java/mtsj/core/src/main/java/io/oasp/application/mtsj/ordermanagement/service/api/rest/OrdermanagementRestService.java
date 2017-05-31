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
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderCto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderFilterCriteria;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineCto;
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
   * Delegates to {@link Ordermanagement#findOrder}.
   *
   * @param id the ID of the {@link OrderEto}
   * @return the {@link OrderEto}
   */
  @GET
  @Path("/order/{id}/")
  public OrderCto getOrder(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#saveOrder}.
   *
   * @param order the {@link OrderEto} to be saved
   * @return the recently created {@link OrderEto}
   */
  @POST
  @Path("/order/")
  public OrderEto saveOrder(OrderCto order);

  /**
   * Delegates to {@link Ordermanagement#deleteOrder}.
   *
   * @param id ID of the {@link OrderEto} to be deleted
   */
  @DELETE
  @Path("/order/{id}/")
  public boolean deleteOrder(@PathParam("id") long id);

  @GET
  @Path("/order/cancelorder/{id}/")
  public void cancelOrder(@PathParam("id") long id);

  /**
   * Delegates to {@link Ordermanagement#findOrderCtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding orders.
   * @return the {@link PaginatedListTo list} of matching {@link OrderCto}s.
   */
  @Path("/order/search")
  @POST
  public PaginatedListTo<OrderCto> findOrdersByPost(OrderSearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Ordermanagement#filterOrders}
   *
   * @param filterCriteria the filters to be used to return orders
   * @return the {@link PaginatedListTo list} of matching {@link OrderCto}s.
   */
  @POST
  @Path("/order/filter")
  public PaginatedListTo<OrderCto> filterOrders(OrderFilterCriteria filterCriteria);

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
  public PaginatedListTo<OrderLineCto> findOrderLinesByPost(OrderLineSearchCriteriaTo searchCriteriaTo);
}
