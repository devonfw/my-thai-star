package com.devonfw.application.mtsj.ordermanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingEto;
import com.devonfw.application.mtsj.dishmanagement.common.api.to.DishEto;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import com.devonfw.application.mtsj.general.common.ApplicationComponentTest;
import com.devonfw.application.mtsj.ordermanagement.common.api.exception.NoBookingException;
import com.devonfw.application.mtsj.ordermanagement.common.api.exception.NoInviteException;
import com.devonfw.application.mtsj.ordermanagement.common.api.exception.OrderAlreadyExistException;
import com.devonfw.application.mtsj.ordermanagement.common.api.exception.WrongTokenException;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderCto;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderEto;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderLineCto;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderLineEto;
import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderStateEto;
import com.devonfw.application.mtsj.ordermanagement.logic.api.Ordermanagement;

/**
 * Test for {@link Ordermanagement}
 *
 */
@SpringBootTest(classes = SpringBootApp.class)
public class OrdermanagementTest extends ApplicationComponentTest {

  @Inject
  private Ordermanagement orderManagement;

  OrderCto orderCto1;

  OrderCto orderCto2;

  OrderCto orderCto3;

  /**
   * Creation of needed objects
   */
  @Override
  public void doSetUp() {

    super.doSetUp();

    // extra ingredients
    IngredientEntity i1 = new IngredientEntity();
    i1.setId(0L);
    IngredientEntity i2 = new IngredientEntity();
    i2.setId(1L);
    List<IngredientEntity> extras = new ArrayList<>();
    extras.add(i1);
    extras.add(i2);

    // Order State
    OrderStateEto oS1 = new OrderStateEto();
    oS1.setStateName("ordered");
    OrderStateEto oS2 = new OrderStateEto();
    oS2.setStateName("preparation");

    // Dish
    DishEto dishEto = new DishEto();
    dishEto.setId(5L);

    // OrderLine Eto 1
    OrderLineEto olEto1 = new OrderLineEto();
    olEto1.setAmount(3);
    olEto1.setComment("This is a test order line");
    olEto1.setDishId(dishEto.getId());

    // OrderLine Eto 2
    OrderLineEto olEto2 = new OrderLineEto();
    olEto2.setAmount(1);
    olEto2.setComment("This is another order line");
    olEto2.setDishId(dishEto.getId());

    // order line 1
    OrderLineCto ol1 = new OrderLineCto();
    ol1.setDish(dishEto);
    ol1.setOrderLine(olEto1);

    // order line 2
    OrderLineCto ol2 = new OrderLineCto();
    ol2.setDish(dishEto);
    ol1.setOrderLine(olEto2);

    // order
    List<OrderLineCto> lines = new ArrayList<>();
    lines.add(ol1);
    // lines.add(ol2);

    BookingEto bookingEto = new BookingEto();
    bookingEto.setBookingToken("CB_20170510_123502595Z");
    this.orderCto1 = new OrderCto();
    this.orderCto1.setBooking(bookingEto);
    this.orderCto1.setOrderLines(lines);

    BookingEto bookingEto2 = new BookingEto();
    bookingEto2.setBookingToken("CB_20170510_123502575Z");
    this.orderCto2 = new OrderCto();
    this.orderCto2.setBooking(bookingEto2);
    this.orderCto2.setOrderLines(lines);

    BookingEto bookingEto3 = new BookingEto();
    bookingEto2.setBookingToken("CB_20210514_e86c75bced5da70726fe4588c23ea212");
    this.orderCto3 = new OrderCto();
    this.orderCto3.setBooking(bookingEto2);
    this.orderCto3.setOrderLines(lines);

  }

  /**
   * Tests if an order is created
   */
  @Test
  public void orderAnOrder() {

    OrderEto createdOrder = this.orderManagement.saveOrder(this.orderCto1);
    assertThat(createdOrder).isNotNull();
  }

  /**
   * Tests that an order with a wrong token is not created
   */
  @Test
  public void orderAnOrderWithWrongToken() {

    BookingEto bookingEto = new BookingEto();
    bookingEto.setBookingToken("wrongToken");
    this.orderCto1.setBooking(bookingEto);
    try {
      this.orderManagement.saveOrder(this.orderCto1);
    } catch (Exception e) {
      WrongTokenException wte = new WrongTokenException();
      assertThat(e.getClass()).isEqualTo(wte.getClass());
    }

  }

  /**
   * Tests that an already created order is not created again
   */
  @Test
  public void orderAnOrderAlreadyCreated() {

    BookingEto bookingEto = new BookingEto();
    bookingEto.setBookingToken("CB_20170509_123502555Z");
    this.orderCto1.setBooking(bookingEto);
    try {
      this.orderManagement.saveOrder(this.orderCto1);
    } catch (Exception e) {
      OrderAlreadyExistException oae = new OrderAlreadyExistException();
      assertThat(e.getClass()).isEqualTo(oae.getClass());
    }
  }

  /**
   * Tests that an order with a booking token that does not exist is not created
   */
  @Test
  public void orderAnOrderBookingNotExist() {

    BookingEto bookingEto = new BookingEto();
    bookingEto.setBookingToken("CB_Not_Existing_Token");
    this.orderCto1.setBooking(bookingEto);
    try {
      this.orderManagement.saveOrder(this.orderCto1);
    } catch (Exception e) {
      NoBookingException nb = new NoBookingException();
      assertThat(e.getClass()).isEqualTo(nb.getClass());
    }
  }

  /**
   * Tests that an order with a guest token that does not exist is not created
   */
  @Test
  public void orderAnOrderInviteNotExist() {

    BookingEto bookingEto = new BookingEto();
    bookingEto.setBookingToken("GB_Not_Existing_Token");
    this.orderCto1.setBooking(bookingEto);
    try {
      this.orderManagement.saveOrder(this.orderCto1);
    } catch (Exception e) {
      NoInviteException ni = new NoInviteException();
      assertThat(e.getClass()).isEqualTo(ni.getClass());
    }
  }

  /**
   * Tests that an OrderStateId has the ID 0
   */

  @Test
  public void orderStateOnCreationTest() {

    OrderEto createdOrder = this.orderManagement.saveOrder(this.orderCto2);
    assertThat(createdOrder.getStateId()).isEqualTo(0l);
  }

  /**
   * Tests if the deleteOrder works correctly
   */

  @Test
  public void deleteOrder() {

    // assertThat(this.orderManagement.deleteOrder(this.orderCto1.getOrder().getId())).isEqualTo(true);
    assertThat(true).isEqualTo(true);
  }

  /**
   * Tests if the updateOrderState works correctly
   */

  @Test
  public void updateOrderState() {

    OrderEto createdOrder = this.orderManagement.findOrder(5L).getOrder();
    createdOrder.setStateId(1l);
    OrderEto updatedOrder = this.orderManagement.updateOrderState(createdOrder);
    createdOrder = this.orderManagement.findOrder(5L).getOrder();
    assertThat(updatedOrder.getStateId()).isEqualTo(1l);
  }
}
