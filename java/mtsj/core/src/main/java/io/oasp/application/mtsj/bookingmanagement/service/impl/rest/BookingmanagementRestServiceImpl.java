package io.oasp.application.mtsj.bookingmanagement.service.impl.rest;

import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.service.api.rest.BookingmanagementRestService;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Bookingmanagement}.
 */
@Named("BookingmanagementRestService")
public class BookingmanagementRestServiceImpl implements BookingmanagementRestService {

  @Inject
  private Bookingmanagement bookingmanagement;

  @Override
  public TableEto getTable(long id) {

    return this.bookingmanagement.findTable(id);
  }

  @Override
  public TableEto saveTable(TableEto table) {

    return this.bookingmanagement.saveTable(table);
  }

  @Override
  public void deleteTable(long id) {

    this.bookingmanagement.deleteTable(id);
  }

  @Override
  public PaginatedListTo<TableEto> findTablesByPost(TableSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findTableEtos(searchCriteriaTo);
  }

  @Override
  public BookingEto getBooking(long id) {

    return this.bookingmanagement.findBooking(id);
  }

  @Override
  public BookingEto saveBooking(BookingEto booking) throws NoSuchAlgorithmException {

    return this.bookingmanagement.saveBooking(booking);
  }

  @Override
  public void deleteBooking(long id) {

    this.bookingmanagement.deleteBooking(id);
  }

  @Override
  public PaginatedListTo<BookingEto> findBookingsByPost(BookingSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findBookingEtos(searchCriteriaTo);
  }

  @Override
  public InvitedGuestEto getInvitedGuest(long id) {

    return this.bookingmanagement.findInvitedGuest(id);
  }

  @Override
  public InvitedGuestEto saveInvitedGuest(InvitedGuestEto invitedguest) {

    return this.bookingmanagement.saveInvitedGuest(invitedguest);
  }

  @Override
  public void deleteInvitedGuest(long id) {

    this.bookingmanagement.deleteInvitedGuest(id);
  }

  @Override
  public PaginatedListTo<InvitedGuestEto> findInvitedGuestsByPost(InvitedGuestSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findInvitedGuestEtos(searchCriteriaTo);
  }

  @Override
  public void cancelInvited(String bookingToken) {

    this.bookingmanagement.cancelInvited(bookingToken);

  }

}
