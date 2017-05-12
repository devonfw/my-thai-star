package io.oasp.application.mtsj.reservationmanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import io.oasp.application.mtsj.reservationmanagement.logic.api.Reservationmanagement;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Reservationmanagement}.
 */
@Path("/reservationmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ReservationmanagementRestService {

  /**
   * Delegates to {@link Reservationmanagement#findReservation}.
   *
   * @param id the ID of the {@link ReservationEto}
   * @return the {@link ReservationEto}
   */
  @GET
  @Path("/reservation/{id}/")
  public ReservationEto getReservation(@PathParam("id") long id);

  /**
   * Delegates to {@link Reservationmanagement#saveReservation}.
   *
   * @param reservation the {@link ReservationEto} to be saved
   * @return the recently created {@link ReservationEto}
   */
  @POST
  @Path("/reservation/")
  public ReservationEto saveReservation(ReservationEto reservation);

  /**
   * Delegates to {@link Reservationmanagement#deleteReservation}.
   *
   * @param id ID of the {@link ReservationEto} to be deleted
   */
  @DELETE
  @Path("/reservation/{id}/")
  public void deleteReservation(@PathParam("id") long id);

  /**
   * Delegates to {@link Reservationmanagement#findReservationEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding reservations.
   * @return the {@link PaginatedListTo list} of matching {@link ReservationEto}s.
   */
  @Path("/reservation/search")
  @POST
  public PaginatedListTo<ReservationEto> findReservationsByPost(ReservationSearchCriteriaTo searchCriteriaTo);

}