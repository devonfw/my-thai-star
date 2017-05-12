package io.oasp.application.mtsj.reservationmanagement.logic.api;

import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Reservationmanagement component.
 */
public interface Reservationmanagement {

  /**
   * Returns a Reservation by its id 'id'.
   *
   * @param id The id 'id' of the Reservation.
   * @return The {@link ReservationEto} with id 'id'
   */
  ReservationEto findReservation(Long id);

  /**
   * Returns a paginated list of Reservations matching the search criteria.
   *
   * @param criteria the {@link ReservationSearchCriteriaTo}.
   * @return the {@link List} of matching {@link ReservationEto}s.
   */
  PaginatedListTo<ReservationEto> findReservationEtos(ReservationSearchCriteriaTo criteria);

  /**
   * Deletes a reservation from the database by its id 'reservationId'.
   *
   * @param reservationId Id of the reservation to delete
   * @return boolean <code>true</code> if the reservation can be deleted, <code>false</code> otherwise
   */
  boolean deleteReservation(Long reservationId);

  /**
   * Saves a reservation and store it in the database.
   *
   * @param reservation the {@link ReservationEto} to create.
   * @return the new {@link ReservationEto} that has been saved with ID and version.
   */
  ReservationEto saveReservation(ReservationEto reservation);

}