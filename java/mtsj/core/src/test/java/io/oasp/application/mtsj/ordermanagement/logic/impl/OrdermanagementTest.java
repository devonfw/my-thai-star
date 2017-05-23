package io.oasp.application.mtsj.ordermanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import io.oasp.application.mtsj.SpringBootApp;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.NoBookingException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.NoInviteException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.OrderAlreadyExistException;
import io.oasp.application.mtsj.ordermanagement.common.api.exception.WrongTokenException;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.module.test.common.base.ComponentTest;

/**
 * Test for {@link Ordermanagement}
 *
 */
@SpringApplicationConfiguration(classes = SpringBootApp.class)
@WebAppConfiguration
public class OrdermanagementTest extends ComponentTest {

  @Inject
  private Ordermanagement orderManagement;

  OrderEto orderEto;

  /**
   * Creation of needed objects
   */
  @Override
  public void doSetUp() {

    // extra ingredients
    Ingredient i1 = new Ingredient();
    i1.setId(0L);
    Ingredient i2 = new Ingredient();
    i2.setId(1L);
    List<Ingredient> extras = new ArrayList<>();
    extras.add(i1);
    extras.add(i2);

    // order line 1
    OrderLineEntity ol1 = new OrderLineEntity();
    ol1.setIdDish(5L);
    ol1.setExtras(extras);
    ol1.setAmount(1);
    ol1.setComment("This is a test order line");

    // order line 1
    OrderLineEntity ol2 = new OrderLineEntity();
    ol2.setIdDish(5L);
    ol2.setExtras(new ArrayList<Ingredient>());
    ol2.setAmount(1);
    ol2.setComment("This is another order line");

    // order
    List<OrderLineEntity> lines = new ArrayList<>();
    lines.add(ol1);
    lines.add(ol2);

    this.orderEto = new OrderEto();
    this.orderEto.setToken("CB_20170510_123502595Z");
    this.orderEto.setLines(lines);
  }

  /**
   * Tests if an order is created
   */
  @Test
  public void orderAnOrder() {

    OrderEto createdOrder = this.orderManagement.saveOrder(this.orderEto);
    assertThat(createdOrder).isNotNull();
  }

  /**
   * Tests that an order with a wrong token is not created
   */
  @Test
  public void orderAnOrderWithWrongToken() {

    this.orderEto.setToken("wrongToken");
    try {
      this.orderManagement.saveOrder(this.orderEto);
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

    this.orderEto.setToken("CB_20170509_123502555Z");
    try {
      this.orderManagement.saveOrder(this.orderEto);
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

    this.orderEto.setToken("CB_Not_Existing_Token");
    try {
      this.orderManagement.saveOrder(this.orderEto);
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

    this.orderEto.setToken("GB_Not_Existing_Token");
    try {
      this.orderManagement.saveOrder(this.orderEto);
    } catch (Exception e) {
      NoInviteException ni = new NoInviteException();
      assertThat(e.getClass()).isEqualTo(ni.getClass());
    }
  }
}
