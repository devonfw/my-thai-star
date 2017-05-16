package io.oasp.application.mtsj.reservationmanagement.logic.api;

import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Reservationmanagement component.
 */
public interface Reservationmanagement {

  /**
   * Returns a Table by its id 'id'.
   *
   * @param id The id 'id' of the Table.
   * @return The {@link TableEto} with id 'id'
   */
  TableEto findTable(Long id);

  /**
   * Returns a paginated list of Tables matching the search criteria.
   *
   * @param criteria the {@link TableSearchCriteriaTo}.
   * @return the {@link List} of matching {@link TableEto}s.
   */
  PaginatedListTo<TableEto> findTableEtos(TableSearchCriteriaTo criteria);

  /**
   * Deletes a table from the database by its id 'tableId'.
   *
   * @param tableId Id of the table to delete
   * @return boolean <code>true</code> if the table can be deleted, <code>false</code> otherwise
   */
  boolean deleteTable(Long tableId);

  /**
   * Saves a table and store it in the database.
   *
   * @param table the {@link TableEto} to create.
   * @return the new {@link TableEto} that has been saved with ID and version.
   */
  TableEto saveTable(TableEto table);

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

  /**
   * Returns a ReservationType by its id 'id'.
   *
   * @param id The id 'id' of the ReservationType.
   * @return The {@link ReservationTypeEto} with id 'id'
   */
  ReservationTypeEto findReservationType(Long id);

  /**
   * Returns a paginated list of ReservationTypes matching the search criteria.
   *
   * @param criteria the {@link ReservationTypeSearchCriteriaTo}.
   * @return the {@link List} of matching {@link ReservationTypeEto}s.
   */
  PaginatedListTo<ReservationTypeEto> findReservationTypeEtos(ReservationTypeSearchCriteriaTo criteria);

  /**
   * Deletes a reservationType from the database by its id 'reservationTypeId'.
   *
   * @param reservationTypeId Id of the reservationType to delete
   * @return boolean <code>true</code> if the reservationType can be deleted, <code>false</code> otherwise
   */
  boolean deleteReservationType(Long reservationTypeId);

  /**
   * Saves a reservationType and store it in the database.
   *
   * @param reservationType the {@link ReservationTypeEto} to create.
   * @return the new {@link ReservationTypeEto} that has been saved with ID and version.
   */
  ReservationTypeEto saveReservationType(ReservationTypeEto reservationType);

}
