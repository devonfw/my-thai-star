package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.BookingDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyApplicationDaoImpl;

/**
 * This is the implementation of {@link BookingDao}.
 */
@Named
public class BookingDaoImpl extends LegacyApplicationDaoImpl<BookingEntity> implements BookingDao {

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
    JPAQuery<BookingEntity> query = new JPAQuery<BookingEntity>(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(booking.getName()).toLowerCase().eq(name.toLowerCase()));
    }
    String bookingToken = criteria.getBookingToken();
    if (bookingToken != null) {
      query.where(Alias.$(booking.getBookingToken()).toLowerCase().eq(bookingToken.toLowerCase()));
    }
    String comment = criteria.getComment();
    if (comment != null) {
      query.where(Alias.$(booking.getComment()).toLowerCase().eq(comment.toLowerCase()));
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
      query.where(Alias.$(booking.getEmail()).toLowerCase().eq(email.toLowerCase()));
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

    addOrderBy(query, alias, booking, criteria.getSort());
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<BookingEntity> alias, BookingEntity booking,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getName()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(booking.getName()).toLowerCase().desc());
          }
        } else if ("bookingToken".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getBookingToken()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(booking.getBookingToken()).toLowerCase().desc());
          }
        } else if ("comment".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(booking.getComment()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(booking.getComment()).toLowerCase().desc());
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
            query.orderBy(Alias.$(booking.getEmail()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(booking.getEmail()).toLowerCase().desc());
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
