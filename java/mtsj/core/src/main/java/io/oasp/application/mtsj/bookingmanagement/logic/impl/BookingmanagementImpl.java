package io.oasp.application.mtsj.bookingmanagement.logic.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
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
import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
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

  @Inject
  private Ordermanagement orderManagement;

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
    cto.setOrder(getBeanMapper().map(entity.getOrder(), OrderEto.class));
    cto.setInvitedGuests(getBeanMapper().mapList(entity.getInvitedGuests(), InvitedGuestEto.class));
    cto.setOrders(getBeanMapper().mapList(entity.getOrders(), OrderEto.class));
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

    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    criteria.setBookingId(bookingId);
    List<OrderEto> bookingOrders = this.orderManagement.findOrderEtos(criteria).getResult();
    for (OrderEto orderEto : bookingOrders) {
      boolean deleteOrderResult = this.orderManagement.deleteOrder(orderEto.getId());
      if (deleteOrderResult) {
        LOG.debug("The order with id '{}' has been deleted.", orderEto.getId());
      }
    }

    BookingEntity booking = getBookingDao().find(bookingId);
    getBookingDao().delete(booking);
    LOG.debug("The booking with id '{}' has been deleted.", bookingId);
    return true;
  }

  @Override
  public BookingEto saveBooking(BookingEto booking, List<String> emails) {

    Objects.requireNonNull(booking, "booking");
    BookingEntity bookingEntity = new BookingEntity();
    bookingEntity = getBeanMapper().map(booking, BookingEntity.class);

    try {
      bookingEntity.setBookingToken(buildToken(bookingEntity.getEmail(), "CB_"));
    } catch (NoSuchAlgorithmException e) {
      LOG.debug("MD5 Algorithm not available at the enviroment");
    }

    bookingEntity
        .setExpirationDate(Timestamp.from(bookingEntity.getBookingDate().toInstant().minus(Duration.ofHours(1))));

    List<InvitedGuestEto> invited = new ArrayList<>();
    for (String email : emails) {
      InvitedGuestEto invite = new InvitedGuestEto();
      invite.setEmail(email);
      try {
        invite.setGuestToken(buildToken(email, "GB_"));
      } catch (NoSuchAlgorithmException e) {
        LOG.debug("MD5 Algorithm not available at the enviroment");
        // TODO - Create exception
      }
      invite.setAccepted(false);
      invited.add(invite);
    }
    bookingEntity.setInvitedGuests(getBeanMapper().mapList(invited, InvitedGuestEntity.class));

    BookingEntity resultEntity = getBookingDao().save(bookingEntity);
    LOG.debug("Booking with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, BookingEto.class);
  }

  private String buildToken(String email, String type) throws NoSuchAlgorithmException {

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
    return type + sb;
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
    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    criteria.setHostToken(invitedGuest.getGuestToken());
    List<OrderEto> guestOrdersEto = this.orderManagement.findOrderEtos(criteria).getResult();
    for (OrderEto orderEto : guestOrdersEto) {
      this.orderManagement.deleteOrder(orderEto.getId());
    }
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

  // public InvitedGuestEto declineInvite(String guestToken) {
  //
  // Objects.requireNonNull(guestToken);
  // InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
  // criteria.setGuestToken(guestToken);
  // InvitedGuestEto invited = findInvitedGuestEtos(criteria).getResult().get(0);
  // invited.setAccepted(false);
  // return saveInvitedGuest(invited);
  // }

  // public InvitedGuestEto revokeAcceptedInvite(String guestToken) {
  @Override
  public InvitedGuestEto declineInvite(String guestToken) {

    Objects.requireNonNull(guestToken);
    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    criteria.setGuestToken(guestToken);
    InvitedGuestEto invited = findInvitedGuestEtos(criteria).getResult().get(0);
    InvitedGuestEntity invitedEntity = getInvitedGuestDao().findOne(invited.getId());
    invited.setAccepted(false);

    OrderSearchCriteriaTo guestOrderCriteria = new OrderSearchCriteriaTo();
    guestOrderCriteria.setInvitedGuestId(invitedEntity.getId());
    List<OrderEto> guestOrdersEto = this.orderManagement.findOrderEtos(guestOrderCriteria).getResult();
    for (OrderEto orderEto : guestOrdersEto) {
      this.orderManagement.deleteOrder(orderEto.getId());
    }
    // TODO - Estudy about Cascade
    // TODO - Send confirmation email and info email to the host
    return saveInvitedGuest(invited);
  }

  public BookingEto findBookingByEmail(String email) {

    // TODO - Return CTO instead ETO
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
    List<BookingEto> booking = findBookingEtos(bookingCriteria).getResult();
    if (!booking.isEmpty()) {
      // toCancel.get(0).setCanceled(true);
      InvitedGuestSearchCriteriaTo guestCriteria = new InvitedGuestSearchCriteriaTo();
      guestCriteria.setBookingId(booking.get(0).getId());
      List<InvitedGuestEto> guestsEto = findInvitedGuestEtos(guestCriteria).getResult();
      if (!guestsEto.isEmpty()) {
        for (InvitedGuestEto guestEto : guestsEto) {
          deleteInvitedGuest(guestEto.getId());
        }
      }
      // delete booking and related orders
      deleteBooking(booking.get(0).getId());
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
