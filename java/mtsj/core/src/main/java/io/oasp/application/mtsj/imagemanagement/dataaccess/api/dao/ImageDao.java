package io.oasp.application.mtsj.imagemanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.ImageEntity;
import io.oasp.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Image entities
 */
public interface ImageDao extends ApplicationDao<ImageEntity> {

  /**
   * Finds the {@link ImageEntity images} matching the given {@link ImageSearchCriteriaTo}.
   *
   * @param criteria is the {@link ImageSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link ImageEntity} objects.
   */
  PaginatedListTo<ImageEntity> findImages(ImageSearchCriteriaTo criteria);
}
