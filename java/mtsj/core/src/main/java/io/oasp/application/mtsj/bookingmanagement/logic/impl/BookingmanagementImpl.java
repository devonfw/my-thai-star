package io.oasp.application.mtsj.bookingmanagement.logic.impl;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoField;
import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.bookingmanagement.common.api.exception.CancelInviteNotAllowedException;
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
import io.oasp.application.mtsj.mailservice.api.Mail;
import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderCto;
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

  @Value("${server.port}")
  private int port;

  @Value("${server.context-path}")
  private String serverContextPath;

  @Value("${mythaistar.hourslimitcancellation}")
  private int hoursLimit;

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

  @Inject
  private Mail mailService;

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
    List<OrderCto> bookingOrders = this.orderManagement.findOrderCtos(criteria).getResult();
    for (OrderCto orderCto : bookingOrders) {
      boolean deleteOrderResult = this.orderManagement.deleteOrder(orderCto.getOrder().getId());
      if (deleteOrderResult) {
        LOG.debug("The order with id '{}' has been deleted.", orderCto.getOrder().getId());
      }
    }

    BookingEntity booking = getBookingDao().find(bookingId);
    getBookingDao().delete(booking);
    LOG.debug("The booking with id '{}' has been deleted.", bookingId);
    return true;
  }

  @Override
  public BookingEto saveBooking(BookingCto booking) {

    Objects.requireNonNull(booking, "booking");
    BookingEntity bookingEntity = new BookingEntity();
    bookingEntity = getBeanMapper().map(booking, BookingEntity.class);
    bookingEntity.setCanceled(false);
    List<InvitedGuestEntity> invited = getBeanMapper().mapList(booking.getInvitedGuests(), InvitedGuestEntity.class);

    for (InvitedGuestEntity invite : invited) {
      try {
        invite.setGuestToken(buildToken(invite.getEmail(), "GB_"));
      } catch (NoSuchAlgorithmException e) {
        LOG.debug("MD5 Algorithm not available at the enviroment");
      }
      invite.setAccepted(false);
    }

    bookingEntity.setInvitedGuests(invited);
    try {
      bookingEntity.setBookingToken(buildToken(bookingEntity.getEmail(), "CB_"));
    } catch (NoSuchAlgorithmException e) {
      LOG.debug("MD5 Algorithm not available at the enviroment");
    }

    bookingEntity
        .setExpirationDate(Timestamp.from(bookingEntity.getBookingDate().toInstant().minus(Duration.ofHours(1))));

    bookingEntity.setInvitedGuests(getBeanMapper().mapList(invited, InvitedGuestEntity.class));

    BookingEntity resultEntity = getBookingDao().save(bookingEntity);
    LOG.debug("Booking with id '{}' has been created.", resultEntity.getId());

    sendConfirmationEmails(resultEntity);

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
    List<OrderCto> guestOrdersCto = this.orderManagement.findOrderCtos(criteria).getResult();
    for (OrderCto orderCto : guestOrdersCto) {
      this.orderManagement.deleteOrder(orderCto.getOrder().getId());
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
    List<OrderCto> guestOrdersCto = this.orderManagement.findOrderCtos(guestOrderCriteria).getResult();
    for (OrderCto orderCto : guestOrdersCto) {
      this.orderManagement.deleteOrder(orderCto.getOrder().getId());
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

  @Override
  public void cancelInvite(String bookingToken) {

    Objects.requireNonNull(bookingToken, "bookingToken");

    BookingSearchCriteriaTo bookingCriteria = new BookingSearchCriteriaTo();
    bookingCriteria.setBookingToken(bookingToken);
    List<BookingEto> booking = findBookingEtos(bookingCriteria).getResult();
    if (!booking.isEmpty()) {
      // toCancel.get(0).setCanceled(true);
      if (!cancelInviteAllowed(booking.get(0))) {
        throw new CancelInviteNotAllowedException();
      }
      InvitedGuestSearchCriteriaTo guestCriteria = new InvitedGuestSearchCriteriaTo();
      guestCriteria.setBookingId(booking.get(0).getId());
      List<InvitedGuestEto> guestsEto = findInvitedGuestEtos(guestCriteria).getResult();
      if (!guestsEto.isEmpty()) {
        for (InvitedGuestEto guestEto : guestsEto) {
          deleteInvitedGuest(guestEto.getId());
          sendCancellationEmailToGuest(booking.get(0), guestEto);
        }
      }
      // delete booking and related orders
      deleteBooking(booking.get(0).getId());
      sendCancellationEmailToHost(booking.get(0));
    }
  }

  private void sendConfirmationEmails(BookingEntity booking) {

    if (!booking.getInvitedGuests().isEmpty()) {
      for (InvitedGuestEntity guest : booking.getInvitedGuests()) {
        sendInviteEmailToGuest(guest, booking);
      }
    }

    sendConfirmationEmailToHost(booking);
  }

  private void sendInviteEmailToGuest(InvitedGuestEntity guest, BookingEntity booking) {

    try {
      StringBuilder invitedMailContent = new StringBuilder();
      invitedMailContent.append("MY THAI STAR").append("\n");
      invitedMailContent.append("Hi ").append(guest.getEmail()).append("\n");
      invitedMailContent.append(booking.getEmail()).append(" has invited you to an event on My Thai Star restaurant")
          .append("\n");
      invitedMailContent.append("Booking Date: ").append(booking.getBookingDate()).append("\n");

      String linkAccept = "http://localhost:" + this.port + "/" + this.serverContextPath
          + "/services/rest/bookingmanagement/v1/invitedguest/accept/" + guest.getEmail();

      String linkDecline = "http://localhost:" + this.port + "/" + this.serverContextPath
          + "/services/rest/bookingmanagement/v1/invitedguest/decline/" + guest.getEmail();

      invitedMailContent.append("To accept: ").append(linkAccept).append("\n");
      invitedMailContent.append("To decline: ").append(linkDecline).append("\n");

      this.mailService.sendMail(guest.getEmail(), "Event invite", invitedMailContent.toString());
    } catch (Exception e) {
      LOG.error("Email not sent. {}", e.getMessage());
    }

  }

  private void sendConfirmationEmailToHost(BookingEntity booking) {

    try {
      StringBuilder hostMailContent = new StringBuilder();
      hostMailContent.append("MY THAI STAR").append("\n");
      hostMailContent.append("Hi ").append(booking.getEmail()).append("\n");
      hostMailContent.append("Your booking has been confirmed.");
      hostMailContent.append("Host: ").append(booking.getName()).append("<").append(booking.getEmail()).append(">")
          .append("\n");
      hostMailContent.append("Booking Date: ").append(booking.getBookingDate()).append("\n");
      if (!booking.getInvitedGuests().isEmpty()) {
        hostMailContent.append("Guest list:").append("\n");
        for (InvitedGuestEntity guest : booking.getInvitedGuests()) {
          hostMailContent.append("-").append(guest.getEmail()).append("\n");
        }
      }
      this.mailService.sendMail(booking.getEmail(), "Invite confirmation", hostMailContent.toString());
    } catch (Exception e) {
      LOG.error("Email not sent. {}", e.getMessage());
    }
  }

  private void sendCancellationEmailToGuest(BookingEto booking, InvitedGuestEto guest) {

    try {
      StringBuilder mailContent = new StringBuilder();
      mailContent.append("MY THAI STAR").append("\n");
      mailContent.append("Hi ").append(guest.getEmail()).append("\n");
      mailContent.append("The invitation from ").append(booking.getEmail()).append(" for the event on ")
          .append(booking.getBookingDate()).append(" has been cancelled.").append("\n");
      this.mailService.sendMail(guest.getEmail(), "Event cancellation", mailContent.toString());
    } catch (Exception e) {
      LOG.error("Email not sent. {}", e.getMessage());
    }
  }

  private void sendCancellationEmailToHost(BookingEto booking) {

    try {
      StringBuilder mailContent = new StringBuilder();
      mailContent.append("MY THAI STAR").append("\n");
      mailContent.append("Hi ").append(booking.getEmail()).append("\n");
      mailContent.append("The invitation for the event on ").append(booking.getBookingDate())
          .append(" has been cancelled.").append("\n");
      this.mailService.sendMail(booking.getEmail(), "Event cancellation", mailContent.toString());
    } catch (Exception e) {
      LOG.error("Email not sent. {}", e.getMessage());
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

  private boolean cancelInviteAllowed(BookingEto booking) {

    Long bookingTimeMillis = booking.getBookingDate().getTime();
    Long cancellationLimit = bookingTimeMillis - (3600000 * this.hoursLimit);
    Long now = Timestamp.from(Instant.now()).getTime();

    return (now > cancellationLimit) ? false : true;
  }

}
