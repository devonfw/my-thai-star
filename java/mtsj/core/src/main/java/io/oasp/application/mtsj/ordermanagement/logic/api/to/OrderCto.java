package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.bookingmanagement.logic.api.to.BookingEto;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Order
 */
public class OrderCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private OrderEto order;

  private BookingEto booking;

  private InvitedGuestEto invitedGuest;

  private List<OrderLineEto> orderLines;

  private BookingEto host;

  public OrderEto getOrder() {

    return order;
  }

  public void setOrder(OrderEto order) {

    this.order = order;
  }

  public BookingEto getBooking() {

    return booking;
  }

  public void setBooking(BookingEto booking) {

    this.booking = booking;
  }

  public InvitedGuestEto getInvitedGuest() {

    return invitedGuest;
  }

  public void setInvitedGuest(InvitedGuestEto invitedGuest) {

    this.invitedGuest = invitedGuest;
  }

  public List<OrderLineEto> getOrderLines() {

    return orderLines;
  }

  public void setOrderLines(List<OrderLineEto> orderLines) {

    this.orderLines = orderLines;
  }

  public BookingEto getHost() {

    return host;
  }

  public void setHost(BookingEto host) {

    this.host = host;
  }

}
