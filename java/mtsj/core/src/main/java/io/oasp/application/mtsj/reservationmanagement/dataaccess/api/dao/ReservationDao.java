package io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationEntity;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Reservation entities
 */
public interface ReservationDao extends ApplicationDao<ReservationEntity> {

  /**
   * Finds the {@link ReservationEntity reservations} matching the given {@link ReservationSearchCriteriaTo}.
   *
   * @param criteria is the {@link ReservationSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link ReservationEntity} objects.
   */
  PaginatedListTo<ReservationEntity> findReservations(ReservationSearchCriteriaTo criteria);
}
