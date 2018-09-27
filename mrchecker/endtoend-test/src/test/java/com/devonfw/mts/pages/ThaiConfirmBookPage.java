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
  private static final By confirmationDialogSearch = By.className("mat-dialog-container");

  private static final By sendButtonSearch = By.name("bookTableConfirm");

  @Override
  public boolean isLoaded() {

    WebElement confirmationDialog = getDriver().findElementDynamic(confirmationDialogSearch);
    return confirmationDialog.isDisplayed();

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

    WebElement sendButton = getDriver().findElementDynamic(sendButtonSearch);
    sendButton.click();
  }

}
