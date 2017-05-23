package io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Dish entities
 */
public interface DishDao extends ApplicationDao<DishEntity> {

  /**
   * Finds the {@link DishEntity dishs} matching the given {@link DishSearchCriteriaTo}.
   *
   * @param criteria is the {@link DishSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link DishEntity} objects.
   */
  PaginatedListTo<DishEntity> findDishs(DishSearchCriteriaTo criteria);
}
