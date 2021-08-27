package com.devonfw.application.mtsj.bookingmanangement.service;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.headers.Header;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import com.devonfw.application.mtsj.bookingmanangement.common.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanangement.common.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanangement.logic.BookingManagement;

@Path("/booking")
@ApplicationScoped
@Tag(name = "Booking REST")
@Produces(MediaType.APPLICATION_JSON)
public class BookingRestService {

  BookingManagement bookingManagement;

  public BookingRestService(BookingManagement bookingManagement) {

    this.bookingManagement = bookingManagement;
  }

  @Operation(operationId = "getBookingById", description = "Gets booking by Id")
  @APIResponses({
  @APIResponse(responseCode = "200", description = "Ok", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class))),
  @APIResponse(responseCode = "404", description = "Not found", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class))),
  @APIResponse(responseCode = "500", description = "Internal Server Error, please check Problem Details", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class))) })
  @GET
  @Path("/{id}")
  public BookingCto getBooking(@PathParam("id") Long id) {

    return this.bookingManagement.findBooking(id);
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Transactional
  @Operation(operationId = "createBooking", description = "Create the booking")
  @APIResponses({
  @APIResponse(responseCode = "201", description = "Created booking resource", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class)), headers = {
  @Header(name = "Location", description = "URL for the create booking resource") }),
  @APIResponse(responseCode = "400", description = "Bad request", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class))),
  @APIResponse(responseCode = "500", description = "Internal Server Error, please check Problem Details", content = @Content(mediaType = MediaType.APPLICATION_JSON, schema = @Schema(implementation = BookingCto.class))), })
  public BookingEto saveBooking(BookingCto bookingCto) {

    return this.bookingManagement.saveBooking(bookingCto);
  }

  @DELETE
  @Path("/{id}")
  @Transactional
  @Operation(operationId = "deleteBooking", description = "Delete booking")
  @APIResponses(@APIResponse(responseCode = "200", description = "Deleted booking resource"))
  public void deleteBooking(@PathParam("id") Long id) {

    this.bookingManagement.deleteBooking(id);
  }

}
