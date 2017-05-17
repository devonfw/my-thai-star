package io.oasp.application.mtsj.platemanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.PlateEntity;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Plate entities
 */
public interface PlateDao extends ApplicationDao<PlateEntity> {

  /**
   * Finds the {@link PlateEntity plates} matching the given {@link PlateSearchCriteriaTo}.
   *
   * @param criteria is the {@link PlateSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link PlateEntity} objects.
   */
  PaginatedListTo<PlateEntity> findPlates(PlateSearchCriteriaTo criteria);

}
