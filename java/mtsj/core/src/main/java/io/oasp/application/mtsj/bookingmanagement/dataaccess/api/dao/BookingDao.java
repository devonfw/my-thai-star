package io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Booking entities
 */
public interface BookingDao extends ApplicationDao<BookingEntity> {

  /**
   * Finds the {@link BookingEntity bookings} matching the given {@link BookingSearchCriteriaTo}.
   *
   * @param criteria is the {@link BookingSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link BookingEntity} objects.
   */
  PaginatedListTo<BookingEntity> findBookings(BookingSearchCriteriaTo criteria);

}
