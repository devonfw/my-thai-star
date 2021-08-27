package com.devonfw.application.mtsj;

import static io.restassured.RestAssured.given;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import io.quarkus.test.junit.QuarkusTest;

@QuarkusTest
public class BookingRestServiceTest {

  @BeforeEach
  public void setup() {

  }

  @Test
  public void testGetBooking() {

    //given().when().get("/booking/0").then().statusCode(200);
  }
}
