package io.oasp.application.mtsj.platemanagement.logic.api;

import java.util.List;

import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Platemanagement component.
 */
public interface Platemanagement {

  /**
   * Returns a Plate by its id 'id'.
   *
   * @param id The id 'id' of the Plate.
   * @return The {@link PlateEto} with id 'id'
   */
  PlateEto findPlate(Long id);

  /**
   * Returns a paginated list of Plates matching the search criteria.
   *
   * @param criteria the {@link PlateSearchCriteriaTo}.
   * @return the {@link List} of matching {@link PlateEto}s.
   */
  PaginatedListTo<PlateEto> findPlateEtos(PlateSearchCriteriaTo criteria);

  /**
   * Deletes a plate from the database by its id 'plateId'.
   *
   * @param plateId Id of the plate to delete
   * @return boolean <code>true</code> if the plate can be deleted, <code>false</code> otherwise
   */
  boolean deletePlate(Long plateId);

  /**
   * Saves a plate and store it in the database.
   *
   * @param plate the {@link PlateEto} to create.
   * @return the new {@link PlateEto} that has been saved with ID and version.
   */
  PlateEto savePlate(PlateEto plate);

}
