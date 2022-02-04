package com.devonfw.application;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.CREATED;
import static javax.ws.rs.core.Response.Status.NO_CONTENT;
import static javax.ws.rs.core.Response.Status.OK;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.math.BigDecimal;

import javax.ws.rs.core.MediaType;

import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import com.devonfw.application.dishmanagement.service.rest.v1.model.CategoryDto;
import com.devonfw.application.dishmanagement.service.rest.v1.model.DishDto;
import com.devonfw.application.dishmanagement.service.rest.v1.model.IngredientDto;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.response.Response;

@QuarkusTest
public class DishManagementRestServiceTest {

  @Test
  @Order(1)
  void saveCategory() {

    CategoryDto category = new CategoryDto();
    category.setName("Main dishes");
    category.setShowOrder(1);
    category.setDescription("Main Dishes");
    category.setId(9L);
    category.setModificationCounter(0);

    Response response = given().when().body(category).contentType(MediaType.APPLICATION_JSON)
        .post("/dishmanagement/v1/category/").then().log().all().statusCode(CREATED.getStatusCode()).extract()
        .response();
    String url = response.header("Location");
    response = given().when().contentType(MediaType.APPLICATION_JSON).get(url).then().log().all()
        .statusCode(OK.getStatusCode()).extract().response();

    assertEquals(category.getName(), response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(2)
  void getCategory() {

    Response response = given().when().contentType(MediaType.APPLICATION_JSON).get("/dishmanagement/v1/category/8/")
        .then().log().all().statusCode(OK.getStatusCode()).extract().response();

    assertEquals("Drinks", response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(3)
  void saveIngredient() {

    IngredientDto ingredient = new IngredientDto();
    ingredient.setName("Rice");
    ingredient.setId(2L);
    ingredient.setModificationCounter(0);

    Response response = given().when().body(ingredient).contentType(MediaType.APPLICATION_JSON)
        .post("/dishmanagement/v1/ingredient/").then().log().all().statusCode(CREATED.getStatusCode()).extract()
        .response();
    String url = response.header("Location");
    response = given().when().contentType(MediaType.APPLICATION_JSON).get(url).then().log().all()
        .statusCode(OK.getStatusCode()).extract().response();

    assertEquals(ingredient.getName(), response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(4)
  void getIngredient() {

    Response response = given().when().contentType(MediaType.APPLICATION_JSON).get("/dishmanagement/v1/ingredient/1/")
        .then().log().all().statusCode(OK.getStatusCode()).extract().response();

    assertEquals("Extra curry", response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(5)
  void saveDish() {

    DishDto dishDto = DishDto.builder().name("Dal Tadka").description("curry").price(new BigDecimal("150")).build();
    dishDto.setId(1L);
    dishDto.setModificationCounter(0);

    Response response = given().when().body(dishDto).contentType(MediaType.APPLICATION_JSON)
        .post("/dishmanagement/v1/dish/").then().log().all().statusCode(CREATED.getStatusCode()).extract().response();
    String url = response.header("Location");
    response = given().when().contentType(MediaType.APPLICATION_JSON).get(url).then().log().all()
        .statusCode(OK.getStatusCode()).extract().response();

    assertEquals(dishDto.getName(), response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(6)
  void getDish() {

    Response response = given().when().contentType(MediaType.APPLICATION_JSON).get("/dishmanagement/v1/dish/1/").then()
        .log().all().statusCode(OK.getStatusCode()).extract().response();

    assertEquals("Dal Tadka", response.body().jsonPath().getString("name"));
  }

  @Test
  @Order(7)
  void deleteDish() {

    given().when().log().all().contentType(MediaType.APPLICATION_JSON).delete("/dishmanagement/v1/dish/1/").then()
        .statusCode(NO_CONTENT.getStatusCode());

  }

}
