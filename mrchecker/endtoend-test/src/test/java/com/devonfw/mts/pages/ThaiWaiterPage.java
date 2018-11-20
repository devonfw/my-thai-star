/**
 *
 */
package com.devonfw.mts.pages;

import org.openqa.selenium.By;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
public class ThaiWaiterPage extends BasePage {

  /* Search criteria */
  private static final By ordersTabSearch = By.xpath("//a[@routerlink='/orders']");

  private static final By reservationsTabSearch = By.xpath("//a[@routerlink='/reservations']");

  @Override
  public boolean isLoaded() {

    // TASK Auto-generated method stub
    getDriver().waitForPageLoaded();

    return getDriver().getCurrentUrl().contains("orders");
  }

  @Override
  public void load() {

    BFLogger.logError("MyThaiStar waiter page was not loaded.");

  }

  @Override
  public String pageTitle() {

    // TASK Auto-generated method stub
    return "";
  }

  /**
   * Seek for the orders tab and click on it
   *
   * @return ThaiOrdersPage an object that represents the orders page
   */
  public ThaiOrdersPage switchToOrders() {

    getDriver().findElementDynamic(ordersTabSearch).click();

    return new ThaiOrdersPage();
  }

  /**
   * Seek for the reservations tab and click on it
   *
   * @return ThaiReservationsPage an object representing the reservations page
   */
  public ThaiReservationsPage switchToReservations() {

    getDriver().findElementDynamic(reservationsTabSearch).click();

    return new ThaiReservationsPage();
  }

}
