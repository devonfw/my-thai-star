package io.oasp.application.mtsj.ordermanagement.dataaccess.impl.dao;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

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
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    Long booking = criteria.getBookingId();
    if (booking != null) {
      if (order.getBooking() != null) {
        query.where(Alias.$(order.getBooking().getId()).eq(booking));
      }
    }
    Long invitedGuest = criteria.getInvitedGuestId();
    if (invitedGuest != null) {
      if (order.getInvitedGuest() != null) {
        query.where(Alias.$(order.getInvitedGuest().getId()).eq(invitedGuest));
      }
    }

    return findPaginated(criteria, query, alias);
  }

}
