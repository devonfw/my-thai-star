package io.oasp.application.mtsj.bookingmanagement.logic.impl;

import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitedGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.BookingDao;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.InvitedGuestDao;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.TableDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingCto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of bookingmanagement
 */
@Named
@Transactional
public class BookingmanagementImpl extends AbstractComponentFacade implements Bookingmanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(BookingmanagementImpl.class);

  /**
   * @see #getBookingDao()
   */
  @Inject
  private BookingDao bookingDao;

  /**
   * @see #getInvitedGuestDao()
   */
  @Inject
  private InvitedGuestDao invitedGuestDao;

  /**
   * @see #getTableDao()
   */
  @Inject
  private TableDao tableDao;

  /**
   * The constructor.
   */
  public BookingmanagementImpl() {

    super();
  }

  @Override
  public BookingCto findBooking(Long id) {

    LOG.debug("Get Booking with id {} from database.", id);
    BookingEntity entity = getBookingDao().findOne(id);
    BookingCto cto = new BookingCto();
    cto.setBooking(getBeanMapper().map(entity, BookingEto.class));
    cto.setTable(getBeanMapper().map(entity.getTable(), TableEto.class));
    cto.setInvitedGuests(getBeanMapper().mapList(entity.getInvitedGuests(), InvitedGuestEto.class));
    return cto;
  }

  @Override
  public PaginatedListTo<BookingEto> findBookingEtos(BookingSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<BookingEntity> bookings = getBookingDao().findBookings(criteria);
    return mapPaginatedEntityList(bookings, BookingEto.class);
  }

  @Override
  public boolean deleteBooking(Long bookingId) {

    BookingEntity booking = getBookingDao().find(bookingId);
    getBookingDao().delete(booking);
    LOG.debug("The booking with id '{}' has been deleted.", bookingId);
    return true;
  }

  @Override
  public BookingEto saveBooking(BookingEto booking) {

    Objects.requireNonNull(booking, "booking");
    BookingEntity bookingEntity = getBeanMapper().map(booking, BookingEntity.class);

    // initialize, validate bookingEntity here if necessary
    BookingEntity resultEntity = getBookingDao().save(bookingEntity);
    LOG.debug("Booking with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, BookingEto.class);
  }

  /**
   * Returns the field 'bookingDao'.
   *
   * @return the {@link BookingDao} instance.
   */
  public BookingDao getBookingDao() {

    return this.bookingDao;
  }

  @Override
  public InvitedGuestEto findInvitedGuest(Long id) {

    LOG.debug("Get InvitedGuest with id {} from database.", id);
    return getBeanMapper().map(getInvitedGuestDao().findOne(id), InvitedGuestEto.class);
  }

  @Override
  public PaginatedListTo<InvitedGuestEto> findInvitedGuestEtos(InvitedGuestSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<InvitedGuestEntity> invitedguests = getInvitedGuestDao().findInvitedGuests(criteria);
    return mapPaginatedEntityList(invitedguests, InvitedGuestEto.class);
  }

  @Override
  public boolean deleteInvitedGuest(Long invitedGuestId) {

    InvitedGuestEntity invitedGuest = getInvitedGuestDao().find(invitedGuestId);
    getInvitedGuestDao().delete(invitedGuest);
    LOG.debug("The invitedGuest with id '{}' has been deleted.", invitedGuestId);
    return true;
  }

  @Override
  public InvitedGuestEto saveInvitedGuest(InvitedGuestEto invitedGuest) {

    Objects.requireNonNull(invitedGuest, "invitedGuest");
    InvitedGuestEntity invitedGuestEntity = getBeanMapper().map(invitedGuest, InvitedGuestEntity.class);

    // initialize, validate invitedGuestEntity here if necessary
    InvitedGuestEntity resultEntity = getInvitedGuestDao().save(invitedGuestEntity);
    LOG.debug("InvitedGuest with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, InvitedGuestEto.class);
  }

  /**
   * Returns the field 'invitedGuestDao'.
   *
   * @return the {@link InvitedGuestDao} instance.
   */
  public InvitedGuestDao getInvitedGuestDao() {

    return this.invitedGuestDao;
  }

  @Override
  public TableEto findTable(Long id) {

    LOG.debug("Get Table with id {} from database.", id);
    return getBeanMapper().map(getTableDao().findOne(id), TableEto.class);
  }

  @Override
  public PaginatedListTo<TableEto> findTableEtos(TableSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<TableEntity> tables = getTableDao().findTables(criteria);
    return mapPaginatedEntityList(tables, TableEto.class);
  }

  @Override
  public boolean deleteTable(Long tableId) {

    TableEntity table = getTableDao().find(tableId);
    getTableDao().delete(table);
    LOG.debug("The table with id '{}' has been deleted.", tableId);
    return true;
  }

  @Override
  public TableEto saveTable(TableEto table) {

    Objects.requireNonNull(table, "table");
    TableEntity tableEntity = getBeanMapper().map(table, TableEntity.class);

    // initialize, validate tableEntity here if necessary
    TableEntity resultEntity = getTableDao().save(tableEntity);
    LOG.debug("Table with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, TableEto.class);
  }

  public InvitedGuestEto acceptInvite(String guestToken) {

    Objects.requireNonNull(guestToken);
    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    criteria.setGuestToken(guestToken);
    InvitedGuestEto invited = findInvitedGuestEtos(criteria).getResult().get(0);
    invited.setAccepted(true);
    return saveInvitedGuest(invited);
  }

  public InvitedGuestEto declineInvite(String guestToken) {

    Objects.requireNonNull(guestToken);
    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    criteria.setGuestToken(guestToken);
    InvitedGuestEto invited = findInvitedGuestEtos(criteria).getResult().get(0);
    invited.setAccepted(false);
    return saveInvitedGuest(invited);
  }

  public InvitedGuestEto revokeAcceptedInvite(String guestToken) {

    Objects.requireNonNull(guestToken);
    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    criteria.setGuestToken(guestToken);
    InvitedGuestEto invited = findInvitedGuestEtos(criteria).getResult().get(0);
    invited.setAccepted(false);
    // TODO - Delete orders
    // TODO - Send confirmation email and info email to the host
    return saveInvitedGuest(invited);
  }

  public BookingEto findBookingByEmail(String email) {

    Objects.requireNonNull(email, "email");

    BookingSearchCriteriaTo bookingCriteria = new BookingSearchCriteriaTo();
    bookingCriteria.setEmail(email);
    List<BookingEto> bookings = findBookingEtos(bookingCriteria).getResult();
    if (!bookings.isEmpty()) {
      return bookings.get(0);
    } else {
      InvitedGuestSearchCriteriaTo invitedCriteria = new InvitedGuestSearchCriteriaTo();
      invitedCriteria.setEmail(email);
      List<InvitedGuestEto> inviteds = findInvitedGuestEtos(invitedCriteria).getResult();
      if (!inviteds.isEmpty()) {
        return getBeanMapper().map(findBooking(inviteds.get(0).getBookingId()), BookingEto.class);
      }
    }
    return null;
  }

  public void cancelInvite(String bookingToken) {

    Objects.requireNonNull(bookingToken, "bookingToken");

    BookingSearchCriteriaTo bookingCriteria = new BookingSearchCriteriaTo();
    bookingCriteria.setBookingToken(bookingToken);
    List<BookingEto> toCancel = findBookingEtos(bookingCriteria).getResult();
    if (!toCancel.isEmpty()) {
      toCancel.get(0).setCanceled(true);

    }
  }

  /**
   * Returns the field 'tableDao'.
   *
   * @return the {@link TableDao} instance.
   */
  public TableDao getTableDao() {

    return this.tableDao;
  }

}
