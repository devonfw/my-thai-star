/**
 *
 */
package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

/**
 * @author jambulud
 */
public class ThaiSummaryPage extends BasePage {

  /* Search criteria */
  private static final By textBoxSearch = By.id("mat-input-0");

  private static final By checkBoxSearch = By.xpath("//div[@class='mat-checkbox-inner-container']");

  private static final By acceptButtonSearch = By
      .xpath("//button[@class='text-upper property-text-bold mat-button mat-accent']");

  @Override
  public boolean isLoaded() {

    getDriver().waitForElementVisible(textBoxSearch);
    return true;
  }

  @Override
  public void load() {

    BFLogger.logError("MyThaiStar menu page was not loaded.");

  }

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

    for (char c : bookingId.toCharArray()) {
      textBox.sendKeys(c + "");
    }

    driverWait
        .until((driver) -> driver.findElement(textBoxSearch).getAttribute("value").length() == bookingId.length());

    (new Actions(getDriver())).moveToElement(checkBox).perform();

    checkBox.click();
    acceptButton.click();

  }

}
