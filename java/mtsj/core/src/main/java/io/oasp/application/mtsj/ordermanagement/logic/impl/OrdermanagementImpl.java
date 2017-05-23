package io.oasp.application.mtsj.ordermanagement.logic.impl;

import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingSearchCriteriaTo;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.NoBookingException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.NoInviteException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.OrderAlreadyExistException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.WrongTokenException;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderLineDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of ordermanagement
 */
@Named
public class OrdermanagementImpl extends AbstractComponentFacade implements Ordermanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(OrdermanagementImpl.class);

  /**
   * @see #getOrderDao()
   */
  @Inject
  private OrderDao orderDao;

  /**
   * @see #getOrderLineDao()
   */
  @Inject
  private OrderLineDao orderLineDao;

  @Inject
  private Bookingmanagement bookingManagement;

  /**
   * The constructor.
   */
  public OrdermanagementImpl() {

    super();
  }

  @Override
  public OrderEto findOrder(Long id) {

    LOG.debug("Get Order with id {} from database.", id);
    return getBeanMapper().map(getOrderDao().findOne(id), OrderEto.class);
  }

  @Override
  public PaginatedListTo<OrderEto> findOrderEtos(OrderSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<OrderEntity> orders = getOrderDao().findOrders(criteria);
    return mapPaginatedEntityList(orders, OrderEto.class);
  }

  @Override
  public boolean deleteOrder(Long orderId) {

    OrderEntity order = getOrderDao().find(orderId);
    getOrderDao().delete(order);
    LOG.debug("The order with id '{}' has been deleted.", orderId);
    return true;
  }

  @Override
  @Transactional
  public OrderEto saveOrder(OrderEto order) {

    Objects.requireNonNull(order, "order");
    OrderEntity orderEntity = getBeanMapper().map(order, OrderEntity.class);

    // initialize, validate orderEntity here if necessary

    orderEntity = getValidatedOrder(order.getToken(), orderEntity);

    getOrderDao().save(orderEntity);
    LOG.info("Order with id '{}' has been created.", orderEntity.getId());
    List<OrderLineEntity> orderLines = order.getLines();
    for (OrderLineEntity orderLine : orderLines) {
      OrderLineEto lineEto = getBeanMapper().map(orderLine, OrderLineEto.class);
      lineEto.setOrderId(orderEntity.getId());
      lineEto = saveOrderLine(lineEto);
      LOG.info("OrderLine with id '{}' has been created.", lineEto.getId());
    }
    return getBeanMapper().map(orderEntity, OrderEto.class);
  }

  /**
   * Returns the field 'orderDao'.
   *
   * @return the {@link OrderDao} instance.
   */
  public OrderDao getOrderDao() {

    return this.orderDao;
  }

  @Override
  public OrderLineEto findOrderLine(Long id) {

    LOG.debug("Get OrderLine with id {} from database.", id);
    return getBeanMapper().map(getOrderLineDao().findOne(id), OrderLineEto.class);
  }

  @Override
  public PaginatedListTo<OrderLineEto> findOrderLineEtos(OrderLineSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<OrderLineEntity> orderlines = getOrderLineDao().findOrderLines(criteria);
    return mapPaginatedEntityList(orderlines, OrderLineEto.class);
  }

  @Override
  public boolean deleteOrderLine(Long orderLineId) {

    OrderLineEntity orderLine = getOrderLineDao().find(orderLineId);
    getOrderLineDao().delete(orderLine);
    LOG.debug("The orderLine with id '{}' has been deleted.", orderLineId);
    return true;
  }

  @Override
  public OrderLineEto saveOrderLine(OrderLineEto orderLine) {

    Objects.requireNonNull(orderLine, "orderLine");
    OrderLineEntity orderLineEntity = getBeanMapper().map(orderLine, OrderLineEntity.class);

    // initialize, validate orderLineEntity here if necessary
    getOrderLineDao().save(orderLineEntity);
    LOG.debug("OrderLine with id '{}' has been created.", orderLineEntity.getId());

    return getBeanMapper().map(orderLineEntity, OrderLineEto.class);
  }

  /**
   * Returns the field 'orderLineDao'.
   *
   * @return the {@link OrderLineDao} instance.
   */
  public OrderLineDao getOrderLineDao() {

    return this.orderLineDao;
  }

  private BookingType getOrderType(String token) throws WrongTokenException {

    if (token.startsWith("CB_")) {
      return BookingType.Booking;
    } else if (token.startsWith("GB_")) {
      return BookingType.Invited;
    } else {
      throw new WrongTokenException();
    }
  }

  private BookingEto getBooking(String token) {

    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    criteria.setBookingToken(token);
    PaginatedListTo<BookingEto> booking = this.bookingManagement.findBookingEtos(criteria);
    return booking.getResult().isEmpty() ? null : booking.getResult().get(0);
  }

  private InvitedGuestEto getInvitedGuest(String token) {

    InvitedGuestSearchCriteriaTo criteria = new InvitedGuestSearchCriteriaTo();
    criteria.setGuestToken(token);
    PaginatedListTo<InvitedGuestEto> guest = this.bookingManagement.findInvitedGuestEtos(criteria);
    return guest.getResult().isEmpty() ? null : guest.getResult().get(0);
  }

  private List<OrderEto> getBookingOrders(Long idBooking) {

    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    criteria.setIdBooking(idBooking);
    return findOrderEtos(criteria).getResult();
  }

  private List<OrderEto> getInvitedGuestOrders(Long idInvitedGuest) {

    OrderSearchCriteriaTo criteria = new OrderSearchCriteriaTo();
    criteria.setIdInvitedGuest(idInvitedGuest);
    return findOrderEtos(criteria).getResult();
  }

  private OrderEntity getValidatedOrder(String token, OrderEntity orderEntity) {

    // BOOKING VALIDATION
    if (getOrderType(token) == BookingType.Booking) {
      BookingEto booking = getBooking(token);
      if (booking == null) {
        throw new NoBookingException();
      }
      List<OrderEto> currentOrders = getBookingOrders(booking.getId());
      if (!currentOrders.isEmpty()) {
        throw new OrderAlreadyExistException();
      }
      orderEntity.setIdBooking(booking.getId());

      // GUEST VALIDATION
    } else if (getOrderType(token) == BookingType.Invited) {

      InvitedGuestEto guest = getInvitedGuest(token);
      if (guest == null) {
        throw new NoInviteException();
      }
      List<OrderEto> currentGuestOrders = getInvitedGuestOrders(guest.getId());
      if (!currentGuestOrders.isEmpty()) {
        throw new OrderAlreadyExistException();
      }
      orderEntity.setIdBooking(guest.getBookingId());
      orderEntity.setIdInvitedGuest(guest.getId());
    }

    return orderEntity;
  }

}
