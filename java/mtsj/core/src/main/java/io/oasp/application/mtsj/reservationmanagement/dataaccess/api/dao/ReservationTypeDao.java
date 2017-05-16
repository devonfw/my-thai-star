package io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationTypeEntity;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for ReservationType entities
 */
public interface ReservationTypeDao extends ApplicationDao<ReservationTypeEntity> {

  /**
   * Finds the {@link ReservationTypeEntity reservationtypes} matching the given
   * {@link ReservationTypeSearchCriteriaTo}.
   *
   * @param criteria is the {@link ReservationTypeSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link ReservationTypeEntity} objects.
   */
  PaginatedListTo<ReservationTypeEntity> findReservationTypes(ReservationTypeSearchCriteriaTo criteria);
}
