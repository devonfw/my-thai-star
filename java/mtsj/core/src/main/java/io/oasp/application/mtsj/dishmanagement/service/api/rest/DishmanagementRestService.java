package io.oasp.application.mtsj.dishmanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.oasp.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Dishmanagement}.
 */
@Path("/dishmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface DishmanagementRestService {

  /**
   * Delegates to {@link Dishmanagement#findDish}.
   *
   * @param id the ID of the {@link DishEto}
   * @return the {@link DishEto}
   */
  @GET
  @Path("/dish/{id}/")
  public DishEto getDish(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#saveDish}.
   *
   * @param dish the {@link DishEto} to be saved
   * @return the recently created {@link DishEto}
   */
  @POST
  @Path("/dish/")
  public DishEto saveDish(DishEto dish);

  /**
   * Delegates to {@link Dishmanagement#deleteDish}.
   *
   * @param id ID of the {@link DishEto} to be deleted
   */
  @DELETE
  @Path("/dish/{id}/")
  public void deleteDish(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#findDishEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding dishs.
   * @return the {@link PaginatedListTo list} of matching {@link DishEto}s.
   */
  @Path("/dish/search")
  @POST
  public PaginatedListTo<DishEto> findDishsByPost(DishSearchCriteriaTo searchCriteriaTo);

}
