package com.devonfw.application.mtsj.ordermanagement.dataaccess.api.repo;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import com.devonfw.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link OrderEntity}.
 */
public interface OrderRepository extends DefaultRepository<OrderEntity> {

  /**
   * @param idBooking
   * @return the list {@link OrderEntity} objects that matched the search.
   */
  @Query("SELECT orders FROM OrderEntity orders" //
      + " WHERE orders.booking.id = :idBooking")
  List<OrderEntity> findOrders(@Param("idBooking") Long idBooking);

  /**
   * @param idInvitedGuest
   * @return the list {@link OrderEntity} objects that matched the search.
   */
  @Query("SELECT orders FROM OrderEntity orders" //
      + " WHERE orders.invitedGuest.id = :idInvitedGuest")
  List<OrderEntity> findOrdersByInvitedGuest(@Param("idInvitedGuest") Long idInvitedGuest);

  /**
   * @param bookingToken
   * @return the {@link OrderEntity} objects that matched the search.
   */
  @Query("SELECT orders FROM OrderEntity orders" //
      + " WHERE orders.booking.bookingToken = :bookingToken")
  List<OrderEntity> findOrdersByBookingToken(@Param("bookingToken") String bookingToken);

  /**
   * @param criteria the {@link OrderSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link OrderEntity} objects that matched the search.
   */
  default Page<OrderEntity> findOrders(OrderSearchCriteriaTo criteria) {

    OrderEntity alias = newDslAlias();
    JPAQuery<OrderEntity> query = newDslQuery(alias);

    Long booking = criteria.getBookingId();
    if (booking != null && alias.getBooking() != null) {
      query.where(Alias.$(alias.getBooking().getId()).eq(booking));
    }
    Long invitedGuest = criteria.getInvitedGuestId();
    if (invitedGuest != null && alias.getInvitedGuest() != null) {
      query.where(Alias.$(alias.getInvitedGuest().getId()).eq(invitedGuest));
    }
    String hostToken = criteria.getHostToken();
    if (hostToken != null && alias.getHost() != null) {
      query.where(Alias.$(alias.getBooking().getBookingToken()).eq(hostToken));
    }
    String email = criteria.getEmail();
    if ((email != null) && alias.getBooking() != null) {
      query.where(Alias.$(alias.getBooking().getEmail()).toLowerCase().like(email.toLowerCase()));
    }
    String bookingToken = criteria.getBookingToken();
    if ((bookingToken != null) && alias.getBooking() != null) {
      query.where(Alias.$(alias.getBooking().getBookingToken()).toLowerCase().eq(bookingToken));
    }
    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }

}
