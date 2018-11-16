package com.devonfw.application.mtsj.bookingmanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;
import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.validation.annotation.Validated;

import com.devonfw.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.service.api.rest.BookingmanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Bookingmanagement}.
 */
@Named("BookingmanagementRestService")
@Validated
public class BookingmanagementRestServiceImpl implements BookingmanagementRestService {

  @Inject
  private Bookingmanagement bookingmanagement;

  @Override
  public BookingCto getBooking(long id) {

    return this.bookingmanagement.findBooking(id);
  }

  @Override
  public BookingEto saveBooking(@Valid BookingCto booking) {

    return this.bookingmanagement.saveBooking(booking);
  }

  @Override
  public void deleteBooking(long id) {

    this.bookingmanagement.deleteBooking(id);
  }

  @Override
  public Page<BookingCto> findBookingsByPost(BookingSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findBookingsByPost(searchCriteriaTo);
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
  public Page<InvitedGuestEto> findInvitedGuestsByPost(InvitedGuestSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findInvitedGuestEtos(searchCriteriaTo);
  }

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
  public Page<TableEto> findTablesByPost(TableSearchCriteriaTo searchCriteriaTo) {

    return this.bookingmanagement.findTableEtos(searchCriteriaTo);
  }

  @Override
  public InvitedGuestEto acceptInvite(String guestToken) {

    return this.bookingmanagement.acceptInvite(guestToken);
  }

  @Override
  public InvitedGuestEto declineInvite(String guestToken) {

    return this.bookingmanagement.declineInvite(guestToken);
  }

  @Override
  public void cancelInvite(String bookingToken) {

    this.bookingmanagement.cancelInvite(bookingToken);
  }

}
