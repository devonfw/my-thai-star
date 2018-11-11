package com.devonfw.application.mtsj.dishmanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.devonfw.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishCto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.IngredientEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Dishmanagement}.
 */
@Path("/dishmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface DishmanagementRestService {

  /**
   * Delegates to {@link Dishmanagement#findCategory}.
   *
   * @param id the ID of the {@link CategoryEto}
   * @return the {@link CategoryEto}
   */
  @GET
  @Path("/category/{id}/")
  public CategoryEto getCategory(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#saveCategory}.
   *
   * @param category the {@link CategoryEto} to be saved
   * @return the recently created {@link CategoryEto}
   */
  @POST
  @Path("/category/")
  public CategoryEto saveCategory(CategoryEto category);

  /**
   * Delegates to {@link Dishmanagement#deleteCategory}.
   *
   * @param id ID of the {@link CategoryEto} to be deleted
   */
  @DELETE
  @Path("/category/{id}/")
  public void deleteCategory(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#findCategoryEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding categorys.
   * @return the {@link PaginatedListTo list} of matching {@link CategoryEto}s.
   */
  @Path("/category/search")
  @POST
  public Page<CategoryEto> findCategorysByPost(CategorySearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Dishmanagement#findDish}.
   *
   * @param id the ID of the {@link DishEto}
   * @return the {@link DishEto}
   */
  @GET
  @Path("/dish/{id}/")
  public DishCto getDish(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#saveDish}.
   *
   * @param dish the {@link DishEto} to be saved
   * @return the recently created {@link DishEto}
   */
  @POST
  @Path("/dish/")
  public DishEto saveDish(DishEto dish);

  /**
   * Delegates to {@link Dishmanagement#deleteDish}.
   *
   * @param id ID of the {@link DishEto} to be deleted
   */
  @DELETE
  @Path("/dish/{id}/")
  public void deleteDish(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#findDishEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding dishs.
   * @return the {@link PaginatedListTo list} of matching {@link DishEto}s.
   */
  @Path("/dish/search")
  @POST
  @CrossOrigin
  public Page<DishCto> findDishsByPost(DishSearchCriteriaTo searchCriteriaTo);

  /**
   * Delegates to {@link Dishmanagement#findIngredient}.
   *
   * @param id the ID of the {@link IngredientEto}
   * @return the {@link IngredientEto}
   */
  @GET
  @Path("/ingredient/{id}/")
  public IngredientEto getIngredient(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#saveIngredient}.
   *
   * @param ingredient the {@link IngredientEto} to be saved
   * @return the recently created {@link IngredientEto}
   */
  @POST
  @Path("/ingredient/")
  public IngredientEto saveIngredient(IngredientEto ingredient);

  /**
   * Delegates to {@link Dishmanagement#deleteIngredient}.
   *
   * @param id ID of the {@link IngredientEto} to be deleted
   */
  @DELETE
  @Path("/ingredient/{id}/")
  public void deleteIngredient(@PathParam("id") long id);

  /**
   * Delegates to {@link Dishmanagement#findIngredientEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding ingredients.
   * @return the {@link PaginatedListTo list} of matching {@link IngredientEto}s.
   */
  @Path("/ingredient/search")
  @POST
  public Page<IngredientEto> findIngredientsByPost(IngredientSearchCriteriaTo searchCriteriaTo);

}
