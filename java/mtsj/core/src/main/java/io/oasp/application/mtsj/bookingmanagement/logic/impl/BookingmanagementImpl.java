package io.oasp.application.mtsj.bookingmanagement.logic.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoField;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitationGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.BookingDao;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.InvitationGuestDao;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.TableDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitationGuestEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
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
   * @see #getTableDao()
   */
  @Inject
  private TableDao tableDao;

  /**
   * @see #getBookingDao()
   */
  @Inject
  private BookingDao bookingDao;

  /**
   * @see #getInvitationGuestDao()
   */
  @Inject
  private InvitationGuestDao invitationGuestDao;

  /**
   * The constructor.
   */
  public BookingmanagementImpl() {

    super();
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

  /**
   * Returns the field 'tableDao'.
   *
   * @return the {@link TableDao} instance.
   */
  public TableDao getTableDao() {

    return this.tableDao;
  }

  @Override
  public BookingEto findBooking(Long id) {

    LOG.debug("Get Booking with id {} from database.", id);
    return getBeanMapper().map(getBookingDao().findOne(id), BookingEto.class);
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

    try {
      bookingEntity.setBookingToken(buildBookingToken(bookingEntity.getEmail(), BookingType.Booking));
    } catch (NoSuchAlgorithmException e) {
      LOG.debug("MD5 Algorithm not available at the enviroment");
    }

    Timestamp creationDate = Timestamp.from(Instant.now());

    bookingEntity.setCreationDate(creationDate);

    bookingEntity
        .setExpirationDate(Timestamp.from(bookingEntity.getBookingDate().toInstant().minus(Duration.ofHours(1))));

    BookingEntity resultEntity = getBookingDao().save(bookingEntity);
    LOG.debug("Booking with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, BookingEto.class);
  }

  /**
   * Builds a token for guest or booking depending of the type
   *
   * @param email the email of host or guest
   * @param type the type of the token
   * @throws NoSuchAlgorithmException
   */
  private String buildBookingToken(String email, BookingType type) throws NoSuchAlgorithmException {

    Instant now = Instant.now();
    String date =
        String.format("%04d", now.get(ChronoField.YEAR)) + String.format("%02d", now.get(ChronoField.MONTH_OF_YEAR))
            + String.format("%02d", now.get(ChronoField.DAY_OF_MONTH)) + "_";

    String time = String.format("%02d", now.get(ChronoField.HOUR_OF_DAY))
        + String.format("%02d", now.get(ChronoField.MINUTE_OF_HOUR))
        + String.format("%02d", now.get(ChronoField.SECOND_OF_MINUTE));

    MessageDigest md = MessageDigest.getInstance("MD5");
    md.update((email + date + time).getBytes());
    byte[] digest = md.digest();
    StringBuilder sb = new StringBuilder();
    for (byte b : digest) {
      sb.append(String.format("%02x", b & 0xff));
    }
    if (type.isCommonBooking()) {
      return "CRS_" + sb;
    } else {
      return "GRS_" + sb;
    }
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
  public void cancelInvitation(String bookingToken) {

    Objects.requireNonNull(bookingToken, "bookingToken");
    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    criteria.setBookingToken(bookingToken);

    BookingEntity toCancel = getBookingDao().findBookings(criteria).getResult().get(0);
    if (toCancel.getBookingType().isInvitationBooking()) {
      toCancel.setCanceled(true);
      getBookingDao().save(toCancel);
    }
  }

  @Override
  public InvitationGuestEto findInvitationGuest(Long id) {

    LOG.debug("Get InvitationGuest with id {} from database.", id);
    return getBeanMapper().map(getInvitationGuestDao().findOne(id), InvitationGuestEto.class);
  }

  @Override
  public PaginatedListTo<InvitationGuestEto> findInvitationGuestEtos(InvitationGuestSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<InvitationGuestEntity> invitationguests = getInvitationGuestDao().findInvitationGuests(criteria);
    return mapPaginatedEntityList(invitationguests, InvitationGuestEto.class);
  }

  @Override
  public boolean deleteInvitationGuest(Long invitationGuestId) {

    InvitationGuestEntity invitationGuest = getInvitationGuestDao().find(invitationGuestId);
    getInvitationGuestDao().delete(invitationGuest);
    LOG.debug("The invitationGuest with id '{}' has been deleted.", invitationGuestId);
    return true;
  }

  @Override
  public InvitationGuestEto saveInvitationGuest(InvitationGuestEto invitationGuest) {

    Objects.requireNonNull(invitationGuest, "invitationGuest");
    InvitationGuestEntity invitationGuestEntity = getBeanMapper().map(invitationGuest, InvitationGuestEntity.class);

    try {
      invitationGuestEntity.setGuestToken(buildBookingToken(invitationGuestEntity.getEmail(), BookingType.Invitation));
    } catch (NoSuchAlgorithmException e) {
      LOG.debug("MD5 Algorithm not available at the enviroment");
    }

    // initialize, validate invitationGuestEntity here if necessary
    InvitationGuestEntity resultEntity = getInvitationGuestDao().save(invitationGuestEntity);
    LOG.debug("InvitationGuest with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, InvitationGuestEto.class);
  }

  /**
   * Returns the field 'invitationGuestDao'.
   *
   * @return the {@link InvitationGuestDao} instance.
   */
  public InvitationGuestDao getInvitationGuestDao() {

    return this.invitationGuestDao;
  }

}
