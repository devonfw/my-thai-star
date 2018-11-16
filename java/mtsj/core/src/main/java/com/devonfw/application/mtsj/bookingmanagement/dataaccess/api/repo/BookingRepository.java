package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.sql.Timestamp;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link BookingEntity}.
 */
public interface BookingRepository extends DefaultRepository<BookingEntity> {

  /**
   * @param token
   * @return the {@link BookingEntity} objects that matched the search.
   */
  @Query("SELECT booking FROM BookingEntity booking" //
      + " WHERE booking.bookingToken = :token")
  BookingEntity findBookingByToken(@Param("token") String token);

  /**
   * @param criteria the {@link BookingSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link BookingEntity} objects that matched the search.
   */
  default Page<BookingEntity> findBookings(BookingSearchCriteriaTo criteria) {

    BookingEntity alias = newDslAlias();
    JPAQuery<BookingEntity> query = newDslQuery(alias);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
    }
    String bookingToken = criteria.getBookingToken();
    if (bookingToken != null && !bookingToken.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getBookingToken()), bookingToken, criteria.getBookingTokenOption());
    }
    String comment = criteria.getComment();
    if (comment != null && !comment.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getComment()), comment, criteria.getCommentOption());
    }
    Timestamp bookingDate = criteria.getBookingDate();
    if (bookingDate != null) {
      query.where(Alias.$(alias.getBookingDate()).eq(bookingDate));
    }
    Timestamp expirationDate = criteria.getExpirationDate();
    if (expirationDate != null) {
      query.where(Alias.$(alias.getExpirationDate()).eq(expirationDate));
    }
    Timestamp creationDate = criteria.getCreationDate();
    if (creationDate != null) {
      query.where(Alias.$(alias.getCreationDate()).eq(creationDate));
    }
    String email = criteria.getEmail();
    if (email != null && !email.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getEmail()), email, criteria.getEmailOption());

    }
    Boolean canceled = criteria.getCanceled();
    if (canceled != null) {
      query.where(Alias.$(alias.getCanceled()).eq(canceled));
    }
    BookingType bookingType = criteria.getBookingType();
    if (bookingType != null) {
      query.where(Alias.$(alias.getBookingType()).eq(bookingType));
    }
    Long table = criteria.getTableId();
    if (table != null && alias.getTable() != null) {
      query.where(Alias.$(alias.getTable().getId()).eq(table));
    }
    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }
}
