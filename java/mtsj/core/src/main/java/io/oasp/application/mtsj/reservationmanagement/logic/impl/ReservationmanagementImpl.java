package io.oasp.application.mtsj.reservationmanagement.logic.impl;

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

import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.InvitationGuestEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationTypeEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.InvitationGuestDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.ReservationDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.ReservationTypeDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.TableDao;
import io.oasp.application.mtsj.reservationmanagement.logic.api.Reservationmanagement;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.InvitationGuestEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of reservationmanagement
 */
@Named
@Transactional
public class ReservationmanagementImpl extends AbstractComponentFacade implements Reservationmanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(ReservationmanagementImpl.class);

  /**
   * @see #getTableDao()
   */
  @Inject
  private TableDao tableDao;

  /**
   * @see #getReservationDao()
   */
  @Inject
  private ReservationDao reservationDao;

  /**
   * @see #getReservationTypeDao()
   */
  @Inject
  private ReservationTypeDao reservationTypeDao;

  /**
   * @see #getInvitationGuestDao()
   */
  @Inject
  private InvitationGuestDao invitationGuestDao;

  /**
   * The constructor.
   */
  public ReservationmanagementImpl() {

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
  public ReservationEto findReservation(Long id) {

    LOG.debug("Get Reservation with id {} from database.", id);
    return getBeanMapper().map(getReservationDao().findOne(id), ReservationEto.class);
  }

  @Override
  public PaginatedListTo<ReservationEto> findReservationEtos(ReservationSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<ReservationEntity> reservations = getReservationDao().findReservations(criteria);
    return mapPaginatedEntityList(reservations, ReservationEto.class);
  }

  @Override
  public boolean deleteReservation(Long reservationId) {

    ReservationEntity reservation = getReservationDao().find(reservationId);
    getReservationDao().delete(reservation);
    LOG.debug("The reservation with id '{}' has been deleted.", reservationId);
    return true;
  }

  @Override
  public ReservationEto saveReservation(ReservationEto reservation) {

    Objects.requireNonNull(reservation, "reservation");
    ReservationEntity reservationEntity = getBeanMapper().map(reservation, ReservationEntity.class);

    reservationEntity.setReservationToken(buildReservationToken(reservationEntity));

    Timestamp creationDate = Timestamp.from(Instant.now());

    reservationEntity.setCreationDate(creationDate);

    reservationEntity
        .setExpirationDate(Timestamp.from(reservationEntity.getBookingDate().toInstant().minus(Duration.ofHours(1))));

    ReservationEntity resultEntity = getReservationDao().save(reservationEntity);
    LOG.debug("Reservation with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, ReservationEto.class);
  }

  /**
   *
   */
  private String buildReservationToken(ReservationEntity reservation) {

    Instant now = Instant.now();
    String date =
        String.format("%04d", now.get(ChronoField.YEAR)) + String.format("%02d", now.get(ChronoField.MONTH_OF_YEAR))
            + String.format("%02d", now.get(ChronoField.DAY_OF_MONTH));
    String time = String.format("%02d", now.get(ChronoField.HOUR_OF_DAY))
        + String.format("%02d", now.get(ChronoField.MINUTE_OF_HOUR))
        + String.format("%02d", now.get(ChronoField.SECOND_OF_MINUTE))
        + String.format("%03d", now.get(ChronoField.MILLI_OF_SECOND)) + "Z";

    return reservation.getReservationTypeId() + date + time;

  }

  /**
   * Returns the field 'reservationDao'.
   *
   * @return the {@link ReservationDao} instance.
   */
  public ReservationDao getReservationDao() {

    return this.reservationDao;
  }

  @Override
  public ReservationTypeEto findReservationType(Long id) {

    LOG.debug("Get ReservationType with id {} from database.", id);
    return getBeanMapper().map(getReservationTypeDao().findOne(id), ReservationTypeEto.class);
  }

  @Override
  public PaginatedListTo<ReservationTypeEto> findReservationTypeEtos(ReservationTypeSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<ReservationTypeEntity> reservationtypes = getReservationTypeDao().findReservationTypes(criteria);
    return mapPaginatedEntityList(reservationtypes, ReservationTypeEto.class);
  }

  @Override
  public boolean deleteReservationType(Long reservationTypeId) {

    ReservationTypeEntity reservationType = getReservationTypeDao().find(reservationTypeId);
    getReservationTypeDao().delete(reservationType);
    LOG.debug("The reservationType with id '{}' has been deleted.", reservationTypeId);
    return true;
  }

  @Override
  public ReservationTypeEto saveReservationType(ReservationTypeEto reservationType) {

    Objects.requireNonNull(reservationType, "reservationType");
    ReservationTypeEntity reservationTypeEntity = getBeanMapper().map(reservationType, ReservationTypeEntity.class);

    // initialize, validate reservationTypeEntity here if necessary
    ReservationTypeEntity resultEntity = getReservationTypeDao().save(reservationTypeEntity);
    LOG.debug("ReservationType with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, ReservationTypeEto.class);
  }

  /**
   * Returns the field 'reservationTypeDao'.
   *
   * @return the {@link ReservationTypeDao} instance.
   */
  public ReservationTypeDao getReservationTypeDao() {

    return this.reservationTypeDao;
  }

  @Override
  public void cancelInvitation(String reservationToken) {

    Objects.requireNonNull(reservationToken, "reservationToken");
    ReservationSearchCriteriaTo criteria = new ReservationSearchCriteriaTo();
    criteria.setReservationToken(reservationToken);

    ReservationEntity toCancel = getReservationDao().findReservations(criteria).getResult().get(0);
    if (toCancel.getReservationType().getName().equals("GRS")) {
      toCancel.setCanceled(true);
      getReservationDao().save(toCancel);
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
