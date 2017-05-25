package io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Table entities
 */
public interface TableDao extends ApplicationDao<TableEntity> {

  /**
   * Finds the {@link TableEntity tables} matching the given {@link TableSearchCriteriaTo}.
   *
   * @param criteria is the {@link TableSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link TableEntity} objects.
   */
  PaginatedListTo<TableEntity> findTables(TableSearchCriteriaTo criteria);

}
