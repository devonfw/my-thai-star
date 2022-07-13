package com.devonfw.application.bookingmanangement.rest.v1;

import static javax.ws.rs.core.Response.created;
import static javax.ws.rs.core.Response.status;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import org.springframework.data.domain.Page;

import com.devonfw.application.bookingmanangement.logic.BookingManagement;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableSearchCriteriaTo;

@Path("/bookingmanagement/v1")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookingRestService {

  @Context
  UriInfo uriInfo;

  @Inject
  BookingManagement bookingmanagement;

  @GET
  @Path("/booking/{id}")
  public BookingDto getBooking(@PathParam("id") Long id) {

    return this.bookingmanagement.findBooking(id);
  }

  @POST
  @Path("/booking/")
  @Transactional
  public Response saveBooking(BookingDto booking) {

    String bookingId = Long.toString(this.bookingmanagement.saveBooking(booking).getId());
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(bookingId);
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/booking/{id}")
  @Transactional
  public Response deleteBooking(@PathParam("id") long id) {

    this.bookingmanagement.deleteBooking(id);
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/booking/search")
  @POST
  public Page<BookingDto> findBookingsByPost(BookingSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findBookingsByPost(searchCriteriaTo);

  }

  @GET
  @Path("/invitedguest/{id}/")
  public InvitedGuestDto getInvitedGuest(@PathParam("id") long id) {

    return this.bookingmanagement.findInvitedGuest(id);

  }

  @POST
  @Path("/invitedguest/")
  @Transactional
  public Response saveInvitedGuest(InvitedGuestDto invitedguest) {

    String invitedGuestId = Long.toString(this.bookingmanagement.saveInvitedGuest(invitedguest).getId());
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(invitedGuestId);
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/invitedguest/{id}/")
  public Response deleteInvitedGuest(@PathParam("id") long id) {

    this.bookingmanagement.deleteInvitedGuest(id);
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/invitedguest/search")
  @POST
  public Page<InvitedGuestDto> findInvitedGuestsByPost(InvitedGuestSearchCriteriaTo criteria) {

    return this.bookingmanagement.findInvitedGuestDtos(criteria);
  }

  @Path("/invitedguest/accept/{token}")
  @GET
  public InvitedGuestDto acceptInvite(@PathParam("token") String guestToken) {

    return this.bookingmanagement.acceptInvite(guestToken);
  }

  @Path("/invitedguest/decline/{token}")
  @GET
  public InvitedGuestDto declineInvite(@PathParam("token") String guestToken) {

    return this.bookingmanagement.declineInvite(guestToken);

  }

  @Path("/booking/cancel/{token}")
  @GET
  public void cancelInvite(@PathParam("token") String bookingToken) {

    this.bookingmanagement.cancelInvite(bookingToken);
  }

  @GET
  @Path("/table/{id}/")
  public TableDto getTable(@PathParam("id") long id) {

    return this.bookingmanagement.findTable(id);

  }

  @POST
  @Path("/table/")
  public Response saveTable(TableDto table) {

    String tableId = Long.toString(this.bookingmanagement.saveTable(table).getId());
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(tableId);
    return created(uriBuilder.build()).build();

  }

  @DELETE
  @Path("/table/{id}/")
  public Response deleteTable(@PathParam("id") long id) {

    this.bookingmanagement.deleteTable(id);
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

  @Path("/table/search")
  @POST
  public Page<TableDto> findTablesByPost(TableSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findTableDtos(searchCriteriaTo);
  }

}
