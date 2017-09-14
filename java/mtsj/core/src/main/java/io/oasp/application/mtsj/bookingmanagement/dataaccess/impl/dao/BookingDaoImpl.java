package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.BookingDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link BookingDao}.
 */
@Named
public class BookingDaoImpl extends ApplicationDaoImpl<BookingEntity> implements BookingDao {

  /**
   * The constructor.
   */
  public BookingDaoImpl() {

    super();
  }

  @Override
  public Class<BookingEntity> getEntityClass() {

    return BookingEntity.class;
  }

  @Override
  public PaginatedListTo<BookingEntity> findBookings(BookingSearchCriteriaTo criteria) {

    BookingEntity booking = Alias.alias(BookingEntity.class);
    EntityPathBase<BookingEntity> alias = Alias.$(booking);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(booking.getName()).eq(name));
    }
    String bookingToken = criteria.getBookingToken();
    if (bookingToken != null) {
      query.where(Alias.$(booking.getBookingToken()).eq(bookingToken));
    }
    String comment = criteria.getComment();
    if (comment != null) {
      query.where(Alias.$(booking.getComment()).eq(comment));
    }
    Timestamp bookingDate = criteria.getBookingDate();
    if (bookingDate != null) {
      query.where(Alias.$(booking.getBookingDate()).eq(bookingDate));
    }
    Timestamp expirationDate = criteria.getExpirationDate();
    if (expirationDate != null) {
      query.where(Alias.$(booking.getExpirationDate()).eq(expirationDate));
    }
    Timestamp creationDate = criteria.getCreationDate();
    if (creationDate != null) {
      query.where(Alias.$(booking.getCreationDate()).eq(creationDate));
    }
    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(booking.getEmail()).eq(email));
    }
    Boolean canceled = criteria.getCanceled();
    if (canceled != null) {
      query.where(Alias.$(booking.getCanceled()).eq(canceled));
    }
    BookingType bookingType = criteria.getBookingType();
    if (bookingType != null) {
      query.where(Alias.$(booking.getBookingType()).eq(bookingType));
    }
    Long table = criteria.getTableId();
    if (table != null && booking.getTable() != null) {
      query.where(Alias.$(booking.getTable().getId()).eq(table));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<BookingEntity> alias, BookingEntity booking,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getName()).asc());
          } else {
            query.orderBy(Alias.$(booking.getName()).desc());
          }
        } else if ("bookingToken".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getBookingToken()).asc());
          } else {
            query.orderBy(Alias.$(booking.getBookingToken()).desc());
          }
        } else if ("comment".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getComment()).asc());
          } else {
            query.orderBy(Alias.$(booking.getComment()).desc());
          }
        } else if ("bookingDate".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getBookingDate()).asc());
          } else {
            query.orderBy(Alias.$(booking.getBookingDate()).desc());
          }
        } else if ("expirationDate".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getExpirationDate()).asc());
          } else {
            query.orderBy(Alias.$(booking.getExpirationDate()).desc());
          }
        } else if ("creationDate".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getCreationDate()).asc());
          } else {
            query.orderBy(Alias.$(booking.getCreationDate()).desc());
          }
        } else if ("email".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getEmail()).asc());
          } else {
            query.orderBy(Alias.$(booking.getEmail()).desc());
          }
        } else if ("canceled".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getCanceled()).asc());
          } else {
            query.orderBy(Alias.$(booking.getCanceled()).desc());
          }
        } else if ("bookingType".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getBookingType()).asc());
          } else {
            query.orderBy(Alias.$(booking.getBookingType()).desc());
          }
        }
      }
    }
  }

}
