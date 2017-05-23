package io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Ingredient entities
 */
public interface IngredientDao extends ApplicationDao<IngredientEntity> {
  
  /**
   * Finds the {@link IngredientEntity ingredients} matching the given {@link IngredientSearchCriteriaTo}.
   *
   * @param criteria is the {@link IngredientSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link IngredientEntity} objects.
   */
  PaginatedListTo<IngredientEntity> findIngredients(IngredientSearchCriteriaTo criteria);
}
