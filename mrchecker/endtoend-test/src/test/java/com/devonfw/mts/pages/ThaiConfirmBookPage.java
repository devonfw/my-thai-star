package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
public class ThaiConfirmBookPage extends BasePage {
  public static final By sendSearch = By.className("mat-dialog-container");

  public static final By sendButton = By
      .xpath("//button[@class=\"text-upper mat-button mat-accent\" and not(@type=\"button\")]");

  @Override
  public boolean isLoaded() {

    WebElement sendButton = getDriver().findElementDynamic(sendSearch);
    return sendButton.isDisplayed();

  }

  @Override
  public void load() {

    BFLogger.logError("MyThaiStar booking confirmation page was not loaded.");
  }

  @Override
  public String pageTitle() {

    return "";
  }

  public void confirmBookingData() {

    WebElement send = getDriver().findElementDynamic(sendButton);
    send.click();
  }

}
