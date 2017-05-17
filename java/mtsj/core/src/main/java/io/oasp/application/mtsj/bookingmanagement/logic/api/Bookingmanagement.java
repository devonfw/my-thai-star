package io.oasp.application.mtsj.bookingmanagement.logic.api;

import java.security.NoSuchAlgorithmException;

import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitationGuestEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Interface for Bookingmanagement component.
 */
public interface Bookingmanagement {

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
   * Returns a Booking by its id 'id'.
   *
   * @param id The id 'id' of the Booking.
   * @return The {@link BookingEto} with id 'id'
   */
  BookingEto findBooking(Long id);

  /**
   * Returns a paginated list of Bookings matching the search criteria.
   *
   * @param criteria the {@link BookingSearchCriteriaTo}.
   * @return the {@link List} of matching {@link BookingEto}s.
   */
  PaginatedListTo<BookingEto> findBookingEtos(BookingSearchCriteriaTo criteria);

  /**
   * Deletes a booking from the database by its id 'bookingId'.
   *
   * @param bookingId Id of the booking to delete
   * @return boolean <code>true</code> if the booking can be deleted, <code>false</code> otherwise
   */
  boolean deleteBooking(Long bookingId);

  /**
   * Saves a booking and store it in the database.
   *
   * @param booking the {@link BookingEto} to create.
   * @return the new {@link BookingEto} that has been saved with ID and version.
   * @throws NoSuchAlgorithmException
   */
  BookingEto saveBooking(BookingEto booking) throws NoSuchAlgorithmException;

  /**
   * Returns a InvitationGuest by its id 'id'.
   *
   * @param id The id 'id' of the InvitationGuest.
   * @return The {@link InvitationGuestEto} with id 'id'
   */
  InvitationGuestEto findInvitationGuest(Long id);

  /**
   * Returns a paginated list of InvitationGuests matching the search criteria.
   *
   * @param criteria the {@link InvitationGuestSearchCriteriaTo}.
   * @return the {@link List} of matching {@link InvitationGuestEto}s.
   */
  PaginatedListTo<InvitationGuestEto> findInvitationGuestEtos(InvitationGuestSearchCriteriaTo criteria);

  /**
   * Deletes a invitationGuest from the database by its id 'invitationGuestId'.
   *
   * @param invitationGuestId Id of the invitationGuest to delete
   * @return boolean <code>true</code> if the invitationGuest can be deleted, <code>false</code> otherwise
   */
  boolean deleteInvitationGuest(Long invitationGuestId);

  /**
   * Saves a invitationGuest and store it in the database.
   *
   * @param invitationGuest the {@link InvitationGuestEto} to create.
   * @return the new {@link InvitationGuestEto} that has been saved with ID and version.
   */
  InvitationGuestEto saveInvitationGuest(InvitationGuestEto invitationGuest);

  /**
   */
  void cancelInvitation(String bookingToken);

}
