package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.utils.Utils;

public class ThaiSummaryPage extends BasePage {

  /** Text-box search criteria */
  private static final By textBoxSearch = By.name("orderBookingID");

  /** Check-box search criteria */
  private static final By checkBoxSearch = By.xpath("//mat-checkbox[@data-name='orderTerms']");

  /** Button accept search criteria */
  private static final By acceptButtonSearch = By.name("orderSubmit");

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    getDriver().waitForElementVisible(textBoxSearch);

    return true;
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    BFLogger.logError("MyThaiStar menu page was not loaded.");

  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "";
  }

  /**
   * This method writes an booking id, accepts the data policy and orders a menu
   *
   * @param bookingId the booking identifier
   */
  public void orderMenu(String bookingId) {
    WebDriverWait driverWait = new WebDriverWait(getDriver(), 10);
    WebElement textBox = getDriver().findElementDynamic(textBoxSearch);
    WebElement checkBox = getDriver().findElementDynamic(checkBoxSearch);
    WebElement acceptButton = getDriver().findElementDynamic(acceptButtonSearch);
    Utils.sendKeysWithCheck(bookingId, textBoxSearch, getDriver(), getWebDriverWait());


    checkBox.click();
    acceptButton.click();

  }

}
