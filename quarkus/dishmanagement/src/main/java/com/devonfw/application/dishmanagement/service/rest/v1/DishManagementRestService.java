package com.devonfw.application.dishmanagement.service.rest.v1;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.UriInfo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.common.to.CategoryEto;
import com.devonfw.application.dishmanagement.common.to.DishCto;
import com.devonfw.application.dishmanagement.common.to.DishEto;
import com.devonfw.application.dishmanagement.common.to.IngredientEto;
import com.devonfw.application.dishmanagement.dataaccess.CategorySearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.DishSearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.IngredientSearchCriteriaTo;
import com.devonfw.application.dishmanagement.logic.UcDishManagement;

@Path("/dishmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class DishManagementRestService {

  @Context
  UriInfo uriInfo;

  @Inject
  UcDishManagement ucDishManagement;

  @GET
  @Path("/category/{id}/")
  public CategoryEto getCategory(@PathParam("id") long id) {

    return this.ucDishManagement.findCategory(id);

  }

  @POST
  @Path("/category/")
  public CategoryEto saveCategory(CategoryEto category) {

    System.out.println("Category Name -------- " + category.getName());
    return this.ucDishManagement.saveCategory(category);
  }

  @DELETE
  @Path("/category/{id}/")
  public void deleteCategory(@PathParam("id") long id) {

    this.ucDishManagement.deleteCategory(id);
  }

  @Path("/category/search")
  @POST
  public Page<CategoryEto> findCategorysByPost(CategorySearchCriteriaTo searchCriteriaTo) {

    return this.ucDishManagement.findCategoryEtos(searchCriteriaTo);
  }

  @GET
  @Path("/dish/{id}/")
  public DishCto getDish(@PathParam("id") long id) {

    return this.ucDishManagement.findDish(id);
  }

  @POST
  @Path("/dish/")
  public DishEto saveDish(DishEto dish) {

    return this.ucDishManagement.saveDish(dish);
  }

  @DELETE
  @Path("/dish/{id}/")
  public void deleteDish(@PathParam("id") long id) {

    this.ucDishManagement.deleteDish(id);
  }

  @Path("/dish/search")
  @POST
  // @CrossOrigin
  public Page<DishCto> findDishsByPost(DishSearchCriteriaTo searchCriteriaTo) {

    Page<DishCto> pageDishCto = this.ucDishManagement.findDishCtos(searchCriteriaTo);
    return pageDishCto;
  }

  @GET
  @Path("/ingredient/{id}/")
  public IngredientEto getIngredient(@PathParam("id") long id) {

    return this.ucDishManagement.findIngredient(id);
  }

  @POST
  @Path("/ingredient/")
  public IngredientEto saveIngredient(IngredientEto ingredient) {

    return this.ucDishManagement.saveIngredient(ingredient);
  }

  @DELETE
  @Path("/ingredient/{id}/")
  public void deleteIngredient(@PathParam("id") long id) {

    this.ucDishManagement.deleteIngredient(id);
  }

  @Path("/ingredient/search")
  @POST
  public Page<IngredientEto> findIngredientsByPost(IngredientSearchCriteriaTo searchCriteriaTo) {

    return this.ucDishManagement.findIngredientEtos(searchCriteriaTo);
  }

}
