package com.devonfw.application.mtsj;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.MediaType.APPLICATION_JSON;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.OK;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import com.devonfw.application.bookingmanangement.rest.v1.model.BookingDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableDto;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.response.Response;

@QuarkusTest
public class BookingRestServiceTest {

  @BeforeEach
  public void setup() {

  }

  @Test
  @Order(1)
  void saveUser() {

    TableDto tableDto = TableDto.builder().id(0L) //
        .modificationCounter(1) //
        .seatsNumber(1) //
        .build();
    InvitedGuestDto invitedGuestDto = InvitedGuestDto.builder().id(0L) //
        .modificationCounter(1) //
        .bookingId(0L) //
        .accepted(true) //
        .email("Testname@cg.com") //
        .guestToken("guesttoken") //
        .build();
    BookingDto bookingDto = BookingDto.builder().name("Testname") //
        .email("Testname@cg.com") //
        .bookingToken("token") //
        .bookingDate(new Date().toInstant()) //
        .table(tableDto) //
        .invitedGuests(List.of(invitedGuestDto)) //
        .assistants(2) //
        .build();
    Response response = given().when().contentType(APPLICATION_JSON) //
        .body(bookingDto) //
        .post("/bookingmanagement/v1/booking/") //
        .then().log().all().statusCode(CREATED.getStatusCode()) //
        .extract().response();
    response = given().when().contentType(APPLICATION_JSON) //
        .get(response.header("Location")).then().log().all() //
        .statusCode(OK.getStatusCode()) //
        .extract().response();
    assertEquals(bookingDto.getName(), response.jsonPath().getString("name"));
  }

  @Test
  public void testGetBooking() {

    Response response = given().when().contentType(APPLICATION_JSON) //
        .get("/bookingmanagement/v1/booking/0").then().log() //
        .all().statusCode(OK.getStatusCode()) //
        .extract().response();
  }
}
