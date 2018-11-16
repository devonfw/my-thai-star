package com.devonfw.application.mtsj.bookingmanagement.service.api.rest;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Bookingmanagement}.
 */
@Path("/bookingmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface BookingmanagementRestService {

  /**
   * Delegates to {@link Bookingmanagement#findBooking}.
   *
   * @param id the ID of the {@link BookingEto}
   * @return the {@link BookingEto}
   */
  @GET
  @Path("/booking/{id}/")
  public BookingCto getBooking(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#saveBooking}.
   *
   * @param booking the {@link BookingEto} to be saved
   * @return the recently created {@link BookingEto}
   */
  @POST
  @Path("/booking/")
  public BookingEto saveBooking(@Valid BookingCto booking);

  /**
   * Delegates to {@link Bookingmanagement#deleteBooking}.
   *
   * @param id ID of the {@link BookingEto} to be deleted
   */
  @DELETE
  @Path("/booking/{id}/")
  public void deleteBooking(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#findBookingEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding bookings.
   * @return the {@link PaginatedListTo list} of matching {@link BookingEto}s.
   */
  @Path("/booking/search")
  @POST
  public Page<BookingCto> findBookingsByPost(BookingSearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Bookingmanagement#findInvitedGuest}.
   *
   * @param id the ID of the {@link InvitedGuestEto}
   * @return the {@link InvitedGuestEto}
   */
  @GET
  @Path("/invitedguest/{id}/")
  public InvitedGuestEto getInvitedGuest(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#saveInvitedGuest}.
   *
   * @param invitedguest the {@link InvitedGuestEto} to be saved
   * @return the recently created {@link InvitedGuestEto}
   */
  @POST
  @Path("/invitedguest/")
  public InvitedGuestEto saveInvitedGuest(InvitedGuestEto invitedguest);

  /**
   * Delegates to {@link Bookingmanagement#deleteInvitedGuest}.
   *
   * @param id ID of the {@link InvitedGuestEto} to be deleted
   */
  @DELETE
  @Path("/invitedguest/{id}/")
  public void deleteInvitedGuest(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#findInvitedGuestEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding invitedguests.
   * @return the {@link PaginatedListTo list} of matching {@link InvitedGuestEto}s.
   */
  @Path("/invitedguest/search")
  @POST
  public Page<InvitedGuestEto> findInvitedGuestsByPost(InvitedGuestSearchCriteriaTo searchCriteriaTo);

  @Path("/invitedguest/accept/{token}")
  @GET
  public InvitedGuestEto acceptInvite(@PathParam("token") String guestToken);

  @Path("/invitedguest/decline/{token}")
  @GET
  public InvitedGuestEto declineInvite(@PathParam("token") String guestToken);

  @Path("/booking/cancel/{token}")
  @GET
  public void cancelInvite(@PathParam("token") String bookingToken);

  /**
   * Delegates to {@link Bookingmanagement#findTable}.
   *
   * @param id the ID of the {@link TableEto}
   * @return the {@link TableEto}
   */
  @GET
  @Path("/table/{id}/")
  public TableEto getTable(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#saveTable}.
   *
   * @param table the {@link TableEto} to be saved
   * @return the recently created {@link TableEto}
   */
  @POST
  @Path("/table/")
  public TableEto saveTable(TableEto table);

  /**
   * Delegates to {@link Bookingmanagement#deleteTable}.
   *
   * @param id ID of the {@link TableEto} to be deleted
   */
  @DELETE
  @Path("/table/{id}/")
  public void deleteTable(@PathParam("id") long id);

  /**
   * Delegates to {@link Bookingmanagement#findTableEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding tables.
   * @return the {@link PaginatedListTo list} of matching {@link TableEto}s.
   */
  @Path("/table/search")
  @POST
  public Page<TableEto> findTablesByPost(TableSearchCriteriaTo searchCriteriaTo);
}
