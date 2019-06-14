package com.devonfw.mts.pages;

import org.openqa.selenium.By;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class ThaiWaiterPage extends BasePage {

  /** Orders tab search criteria */
  private static final By ordersTabSearch = By.xpath("//a[@routerlink='/orders']");

  /** Reservations tab search criteria */
  private static final By reservationsTabSearch = By.xpath("//a[@routerlink='/reservations']");

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    getDriver().waitForPageLoaded();

    return getDriver().getCurrentUrl().contains("orders");
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    BFLogger.logError("MyThaiStar waiter page was not loaded.");

  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
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
