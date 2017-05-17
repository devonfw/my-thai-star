package io.oasp.application.mtsj.platemanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.oasp.application.mtsj.platemanagement.logic.api.Platemanagement;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Platemanagement}.
 */
@Path("/platemanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface PlatemanagementRestService {

  /**
   * Delegates to {@link Platemanagement#findPlate}.
   *
   * @param id the ID of the {@link PlateEto}
   * @return the {@link PlateEto}
   */
  @GET
  @Path("/plate/{id}/")
  public PlateEto getPlate(@PathParam("id") long id);

  /**
   * Delegates to {@link Platemanagement#savePlate}.
   *
   * @param plate the {@link PlateEto} to be saved
   * @return the recently created {@link PlateEto}
   */
  @POST
  @Path("/plate/")
  public PlateEto savePlate(PlateEto plate);

  /**
   * Delegates to {@link Platemanagement#deletePlate}.
   *
   * @param id ID of the {@link PlateEto} to be deleted
   */
  @DELETE
  @Path("/plate/{id}/")
  public void deletePlate(@PathParam("id") long id);

  /**
   * Delegates to {@link Platemanagement#findPlateEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding plates.
   * @return the {@link PaginatedListTo list} of matching {@link PlateEto}s.
   */
  @Path("/plate/search")
  @POST
  public PaginatedListTo<PlateEto> findPlatesByPost(PlateSearchCriteriaTo searchCriteriaTo);

}
