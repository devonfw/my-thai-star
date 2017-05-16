package io.oasp.application.mtsj.reservationmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.ReservationDao;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link ReservationDao}.
 */
@Named
public class ReservationDaoImpl extends ApplicationDaoImpl<ReservationEntity> implements ReservationDao {

  /**
   * The constructor.
   */
  public ReservationDaoImpl() {

    super();
  }

  @Override
  public Class<ReservationEntity> getEntityClass() {

    return ReservationEntity.class;
  }

  @Override
  public PaginatedListTo<ReservationEntity> findReservations(ReservationSearchCriteriaTo criteria) {

    ReservationEntity reservation = Alias.alias(ReservationEntity.class);
    EntityPathBase<ReservationEntity> alias = Alias.$(reservation);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(reservation.getName()).eq(name));
    }
    String reservationToken = criteria.getReservationToken();
    if (reservationToken != null) {
      query.where(Alias.$(reservation.getReservationToken()).eq(reservationToken));
    }
    String comment = criteria.getComment();
    if (comment != null) {
      query.where(Alias.$(reservation.getComment()).eq(comment));
    }
    Timestamp bookingDate = criteria.getBookingDate();
    if (bookingDate != null) {
      query.where(Alias.$(reservation.getBookingDate()).eq(bookingDate));
    }
    Timestamp expirationDate = criteria.getExpirationDate();
    if (expirationDate != null) {
      query.where(Alias.$(reservation.getExpirationDate()).eq(expirationDate));
    }
    Timestamp creationDate = criteria.getCreationDate();
    if (creationDate != null) {
      query.where(Alias.$(reservation.getCreationDate()).eq(creationDate));
    }
    boolean canceled = criteria.isCanceled();
    query.where(Alias.$(reservation.isCanceled()).eq(canceled));
    Long reservationType = criteria.getReservationTypeId();
    if (reservationType != null) {
      if (reservation.getReservationType() != null) {
        query.where(Alias.$(reservation.getReservationType().getId()).eq(reservationType));
      }
    }
    Long table = criteria.getTableId();
    if (table != null) {
      if (reservation.getTable() != null) {
        query.where(Alias.$(reservation.getTable().getId()).eq(table));
      }
    }
    return findPaginated(criteria, query, alias);
  }

}