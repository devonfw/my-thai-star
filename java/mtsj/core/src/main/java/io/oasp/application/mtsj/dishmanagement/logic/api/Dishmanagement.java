package io.oasp.application.mtsj.dishmanagement.logic.api;

import java.util.List;

import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Dishmanagement component.
 */
public interface Dishmanagement {

  /**
   * Returns a Dish by its id 'id'.
   *
   * @param id The id 'id' of the Dish.
   * @return The {@link DishEto} with id 'id'
   */
  DishEto findDish(Long id);

  /**
   * Returns a paginated list of Dishs matching the search criteria.
   *
   * @param criteria the {@link DishSearchCriteriaTo}.
   * @return the {@link List} of matching {@link DishEto}s.
   */
  PaginatedListTo<DishEto> findDishEtos(DishSearchCriteriaTo criteria);

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

}
