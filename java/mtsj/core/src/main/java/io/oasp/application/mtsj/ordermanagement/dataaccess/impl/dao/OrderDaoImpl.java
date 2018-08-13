package io.oasp.application.mtsj.ordermanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyDaoQuerySupport;

/**
 * This is the implementation of {@link OrderDao}.
 */
@Named
public class OrderDaoImpl extends ApplicationDaoImpl<OrderEntity> implements OrderDao {

  /**
   * The constructor.
   */
  public OrderDaoImpl() {

    super();
  }

  @Override
  public Class<OrderEntity> getEntityClass() {

    return OrderEntity.class;
  }

  @Override
  public PaginatedListTo<OrderEntity> findOrders(OrderSearchCriteriaTo criteria) {

    OrderEntity order = Alias.alias(OrderEntity.class);
    EntityPathBase<OrderEntity> alias = Alias.$(order);
    JPAQuery query = (JPAQuery) new JPAQuery(getEntityManager()).from(alias);

    Long booking = criteria.getBookingId();
    if (booking != null && order.getBooking() != null) {
      query.where(Alias.$(order.getBooking().getId()).eq(booking));
    }
    Long invitedGuest = criteria.getInvitedGuestId();
    if (invitedGuest != null && order.getInvitedGuest() != null) {
      query.where(Alias.$(order.getInvitedGuest().getId()).eq(invitedGuest));
    }
    String hostToken = criteria.getHostToken();
    if (hostToken != null && order.getHost() != null) {
      query.where(Alias.$(order.getBooking().getBookingToken()).toLowerCase().eq(hostToken.toLowerCase()));
    }

    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(order.getBooking().getEmail()).toLowerCase().eq(email.toLowerCase()));
    }

    String bookingToken = criteria.getBookingToken();
    if (bookingToken != null) {
      query.where(Alias.$(order.getBooking().getBookingToken()).toLowerCase().eq(bookingToken.toLowerCase()));
    }

    addOrderBy(query, alias, order, criteria.getSort());
    return LegacyDaoQuerySupport.findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<OrderEntity> alias, OrderEntity order, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("idBooking".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getBookingId()).asc());
          } else {
            query.orderBy(Alias.$(order.getBookingId()).desc());
          }
        } else if ("idInvitedGuest".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getInvitedGuestId()).asc());
          } else {
            query.orderBy(Alias.$(order.getInvitedGuestId()).desc());
          }
        } else if ("hostToken".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getBooking().getBookingToken()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(order.getBooking().getBookingToken()).toLowerCase().desc());
          }
        } else if ("bookingToken".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getBooking().getBookingToken()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(order.getBooking().getBookingToken()).toLowerCase().desc());
          }
        } else if ("email".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getBooking().getEmail()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(order.getBooking().getEmail()).toLowerCase().desc());
          }
        } else if ("bookingDate".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(order.getBooking().getBookingDate()).asc());
          } else {
            query.orderBy(Alias.$(order.getBooking().getBookingDate()).desc());
          }
        }
      }
    }
  }

}
