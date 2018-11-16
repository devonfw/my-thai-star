package com.devonfw.application.mtsj.bookingmanagement.logic.api;

import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;

/**
 * Interface for Bookingmanagement component.
 */
public interface Bookingmanagement {

  /**
   * Returns a Booking by its id 'id'.
   *
   * @param id The id 'id' of the Booking.
   * @return The {@link BookingEto} with id 'id'
   */
  BookingCto findBooking(Long id);

  /**
   * Returns Booking by token
   *
   * @param token
   * @return The {@link BookingCto}
   */
  BookingCto findBookingByToken(String token);

  /**
   * Returns InvitedGuest by Token
   *
   * @param token
   * @return The {@link InvitedGuestEto}
   */
  InvitedGuestEto findInvitedGuestByToken(String token);

  /**
   * Returns List of InvitedGuestEto
   *
   * @param bookingId
   * @return The list {@link InvitedGuestEto}
   */
  List<InvitedGuestEto> findInvitedGuestByBooking(Long bookingId);

  /**
   * Returns a paginated list of Bookings matching the search criteria. Needs Authorization.
   *
   * @param criteria the {@link BookingSearchCriteriaTo}.
   * @return the {@link List} of matching {@link BookingEto}s.
   */
  Page<BookingCto> findBookingsByPost(BookingSearchCriteriaTo criteria);

  /**
   * Returns a paginated list of Bookings matching the search criteria.
   *
   * @param criteria the {@link BookingSearchCriteriaTo}.
   * @return the {@link List} of matching {@link BookingEto}s.
   */
  Page<BookingCto> findBookingCtos(BookingSearchCriteriaTo criteria);

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
   */
  BookingEto saveBooking(BookingCto booking);

  /**
   * Returns a InvitedGuest by its id 'id'.
   *
   * @param id The id 'id' of the InvitedGuest.
   * @return The {@link InvitedGuestEto} with id 'id'
   */
  InvitedGuestEto findInvitedGuest(Long id);

  /**
   * Returns a paginated list of InvitedGuests matching the search criteria.
   *
   * @param criteria the {@link InvitedGuestSearchCriteriaTo}.
   * @return the {@link List} of matching {@link InvitedGuestEto}s.
   */
  Page<InvitedGuestEto> findInvitedGuestEtos(InvitedGuestSearchCriteriaTo criteria);

  /**
   * Deletes a invitedGuest from the database by its id 'invitedGuestId'.
   *
   * @param invitedGuestId Id of the invitedGuest to delete
   * @return boolean <code>true</code> if the invitedGuest can be deleted, <code>false</code> otherwise
   */
  boolean deleteInvitedGuest(Long invitedGuestId);

  void cancelInvite(String bookingToken);

  /**
   * Saves a invitedGuest and store it in the database.
   *
   * @param invitedGuest the {@link InvitedGuestEto} to create.
   * @return the new {@link InvitedGuestEto} that has been saved with ID and version.
   */
  InvitedGuestEto saveInvitedGuest(InvitedGuestEto invitedGuest);

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
  Page<TableEto> findTableEtos(TableSearchCriteriaTo criteria);

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

  InvitedGuestEto acceptInvite(String guestToken);

  InvitedGuestEto declineInvite(String guestToken);

  String buildToken(String email, String type) throws NoSuchAlgorithmException;

}
