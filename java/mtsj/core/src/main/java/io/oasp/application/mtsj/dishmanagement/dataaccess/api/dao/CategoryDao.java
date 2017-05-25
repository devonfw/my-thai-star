package io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.CategoryEntity;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Category entities
 */
public interface CategoryDao extends ApplicationDao<CategoryEntity> {
  
  /**
   * Finds the {@link CategoryEntity categorys} matching the given {@link CategorySearchCriteriaTo}.
   *
   * @param criteria is the {@link CategorySearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link CategoryEntity} objects.
   */
  PaginatedListTo<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria);
}
