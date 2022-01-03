package com.devonfw.app;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.NO_CONTENT;
import static javax.ws.rs.core.Response.Status.OK;
import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import com.devonfw.application.usermanagement.common.to.UserEto;
import com.devonfw.application.usermanagement.common.to.UserSearchCriteriaTo;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.response.Response;

@QuarkusTest
public class UsermanagementRestServiceTest {

  @Test
  @Order(1)
  void saveUser() {

    UserEto userEto = UserEto.builder().username("TestUser").email("testuser@cg.com").twoFactorStatus(false)
        .userRoleId(1L).build();
    Response response = given().when().body(userEto).contentType(MediaType.APPLICATION_JSON)
        .post("/usermanagement/v1/user/").then().log().all().statusCode(CREATED.getStatusCode()).extract().response();
    String url = response.header("Location");
    response = given().when().contentType(MediaType.APPLICATION_JSON).get(url).then().log().all()
        .statusCode(OK.getStatusCode()).extract().response();
    assertEquals(userEto.getUsername(), response.jsonPath().getString("username"));
  }

  @Test
  @Order(2)
  public void getUserById() {

    Response response = given().when().contentType(MediaType.APPLICATION_JSON).get("/usermanagement/v1/user/1000000")
        .then().log().all().statusCode(OK.getStatusCode()).extract().response();
  }

  @Test
  @Order(3)
  void findUsersByPost() {

    UserSearchCriteriaTo userSearchCriteriaTo = UserSearchCriteriaTo.builder().email("user0@mail.com").build();
    Response response = given().when().body(userSearchCriteriaTo).contentType(MediaType.APPLICATION_JSON)
        .post("/usermanagement/v1/user/search").then().log().all().statusCode(OK.getStatusCode()).extract().response();
  }

  @Test
  @Order(4)
  void deleteUser() {

    given().when().log().all().contentType(MediaType.APPLICATION_JSON).delete("/usermanagement/v1/user/0").then()
        .statusCode(NO_CONTENT.getStatusCode());
    given().when().log().all().contentType(MediaType.APPLICATION_JSON).get("/usermanagement/v1/user/0").then()
        .statusCode(NO_CONTENT.getStatusCode());
  }

  @Test
  void getUserRole() {

    Response response = given().when().contentType(MediaType.APPLICATION_JSON).get("/usermanagement/v1/userrole/0")
        .then().log().all().statusCode(OK.getStatusCode()).extract().response();
    assertEquals("Customer", response.jsonPath().getString("name"));

  }

}
