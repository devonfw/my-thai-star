package io.oasp.application.mtsj.reservationmanagement.logic.impl;

import java.util.Objects;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.oasp.application.mtsj.general.common.api.constants.PermissionConstants;
import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.ReservationDao;
import io.oasp.application.mtsj.reservationmanagement.logic.api.Reservationmanagement;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of reservationmanagement
 */
@Named
public class ReservationmanagementImpl extends AbstractComponentFacade implements Reservationmanagement {

  /** Logger instance. */
  private static final Logger LOG = LoggerFactory.getLogger(ReservationmanagementImpl.class);

  /** @see #getReservationDao() */
  @Inject
  private ReservationDao reservationDao;

  /**
   * The constructor.
   */
  public ReservationmanagementImpl() {
    super();
  }

  @Override
  @RolesAllowed(PermissionConstants.FIND_RESERVATION)
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

    // initialize, validate reservationEntity here if necessary
    getReservationDao().save(reservationEntity);
    LOG.debug("Reservation with id '{}' has been created.", reservationEntity.getId());

    return getBeanMapper().map(reservationEntity, ReservationEto.class);
  }

  /**
   * Returns the field 'reservationDao'.
   *
   * @return the {@link ReservationDao} instance.
   */
  public ReservationDao getReservationDao() {

    return this.reservationDao;
  }

}