package com.devonfw.application.bookingmanangement.rest.v1;

import static com.devonfw.application.bookingmanangement.utils.StringUtils.isEmpty;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.UriBuilder;
import javax.ws.rs.core.UriInfo;

import com.devonfw.application.bookingmanangement.logic.BookingManagement;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingDto;

@Path("/bookingmanagement/v1")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookingRestService {

  @Context
  UriInfo uriInfo;

  @Inject
  BookingManagement bookingManagement;

  @GET
  @Path("/booking/{id}")
  public BookingDto getBooking(@PathParam("id") Long id) {

    return this.bookingManagement.findBooking(id);
  }

  @POST
  @Path("/booking/")
  @Transactional
  public Response saveBooking(BookingDto booking) {

    if (isEmpty(booking.getBookingToken())) {
      throw new WebApplicationException("Booking token was not set on request.", 400);
    }
    String bookingId = Long.toString(this.bookingManagement.saveBooking(booking).getId());
    UriBuilder uriBuilder = this.uriInfo.getAbsolutePathBuilder().path(bookingId);
    return created(uriBuilder.build()).build();
  }

  @DELETE
  @Path("/booking/{id}")
  @Transactional
  public Response deleteBooking(@PathParam("id") long id) {

    this.bookingManagement.deleteBooking(id);
    return status(Status.NO_CONTENT.getStatusCode()).build();
  }

}
