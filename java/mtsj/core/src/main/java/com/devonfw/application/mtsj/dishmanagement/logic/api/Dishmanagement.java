package com.devonfw.application.mtsj.dishmanagement.logic.api;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishCto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.IngredientEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;

/**
 * Interface for Dishmanagement component.
 */
public interface Dishmanagement {

  /**
   * Returns a Category by its id 'id'.
   *
   * @param id The id 'id' of the Category.
   * @return The {@link CategoryEto} with id 'id'
   */
  CategoryEto findCategory(Long id);

  /**
   * Returns a paginated list of Categorys matching the search criteria.
   *
   * @param criteria the {@link CategorySearchCriteriaTo}.
   * @return the {@link List} of matching {@link CategoryEto}s.
   */
  Page<CategoryEto> findCategoryEtos(CategorySearchCriteriaTo criteria);

  /**
   * Deletes a category from the database by its id 'categoryId'.
   *
   * @param categoryId Id of the category to delete
   * @return boolean <code>true</code> if the category can be deleted, <code>false</code> otherwise
   */
  boolean deleteCategory(Long categoryId);

  /**
   * Saves a category and store it in the database.
   *
   * @param category the {@link CategoryEto} to create.
   * @return the new {@link CategoryEto} that has been saved with ID and version.
   */
  CategoryEto saveCategory(CategoryEto category);

  /**
   * Returns a Dish by its id 'id'.
   *
   * @param id The id 'id' of the Dish.
   * @return The {@link DishEto} with id 'id'
   */
  DishCto findDish(Long id);

  /**
   * Returns a paginated list of Dishs matching the search criteria.
   *
   * @param criteria the {@link DishSearchCriteriaTo}.
   * @return the {@link List} of matching {@link DishEto}s.
   */
  Page<DishCto> findDishCtos(DishSearchCriteriaTo criteria);

  /**
   * Deletes a dish from the database by its id 'dishId'.
   *
   * @param dishId Id of the dish to delete
   * @return boolean <code>true</code> if the dish can be deleted, <code>false</code> otherwise
   */
  boolean deleteDish(Long dishId);

  /**
   * Saves a dish and store it in the database.
   *
   * @param dish the {@link DishEto} to create.
   * @return the new {@link DishEto} that has been saved with ID and version.
   */
  DishEto saveDish(DishEto dish);

  /**
   * Returns a Ingredient by its id 'id'.
   *
   * @param id The id 'id' of the Ingredient.
   * @return The {@link IngredientEto} with id 'id'
   */
  IngredientEto findIngredient(Long id);

  /**
   * Returns a paginated list of Ingredients matching the search criteria.
   *
   * @param criteria the {@link IngredientSearchCriteriaTo}.
   * @return the {@link List} of matching {@link IngredientEto}s.
   */
  Page<IngredientEto> findIngredientEtos(IngredientSearchCriteriaTo criteria);

  /**
   * Deletes a ingredient from the database by its id 'ingredientId'.
   *
   * @param ingredientId Id of the ingredient to delete
   * @return boolean <code>true</code> if the ingredient can be deleted, <code>false</code> otherwise
   */
  boolean deleteIngredient(Long ingredientId);

  /**
   * Saves a ingredient and store it in the database.
   *
   * @param ingredient the {@link IngredientEto} to create.
   * @return the new {@link IngredientEto} that has been saved with ID and version.
   */
  IngredientEto saveIngredient(IngredientEto ingredient);

}
