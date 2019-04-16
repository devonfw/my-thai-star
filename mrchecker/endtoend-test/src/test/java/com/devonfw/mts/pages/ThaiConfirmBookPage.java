package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class ThaiConfirmBookPage extends BasePage {

  /** Confirmation dialog search criteria */
  private static final By confirmationDialogSearch = By.className("mat-dialog-container");

  /** Send confirmation button search criteria */
  private static final By sendButtonSearch = By.name("bookTableConfirm");

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    WebElement confirmationDialog = getDriver().findElementDynamic(confirmationDialogSearch);

    return confirmationDialog.isDisplayed();
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    BFLogger.logError("MyThaiStar booking confirmation page was not loaded.");
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "";
  }

  /**
   * Click on the confirmation button
   * */
  public void confirmBookingData() {
    WebElement sendButton = getDriver().findElementDynamic(sendButtonSearch);
    sendButton.click();
  }

}
