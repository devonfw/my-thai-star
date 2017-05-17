package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.BookingDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
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
    boolean canceled = criteria.isCanceled();
    query.where(Alias.$(booking.isCanceled()).eq(canceled));
    BookingType bookingType = criteria.getBookingType();
    if (bookingType != null && booking.getBookingType() != null) {
      query.where(Alias.$(booking.getBookingType()).eq(bookingType));
    }
    Long table = criteria.getTableId();
    if (table != null && booking.getTable() != null) {
      query.where(Alias.$(booking.getTable().getId()).eq(table));
    }
    return findPaginated(criteria, query, alias);
  }

}
