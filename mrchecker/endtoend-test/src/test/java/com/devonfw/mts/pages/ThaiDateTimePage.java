package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class ThaiDateTimePage extends BasePage {

  /** date and time selector search criteria */
  private static final By ticSearch = By.className("owl-dt-control-button-content");

  private static final String xpathArrow = "//*[@id=\"owl-dt-picker-0\"]/div[2]/owl-date-time-timer/owl-date-time-timer-box[1]/button[1]";

  private static final By arrowSearch = By.xpath(xpathArrow);

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    WebElement ticButton = getDriver().findElementDynamic(ticSearch);

    return ticButton.isDisplayed();
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    BFLogger.logError("MyThaiStar page for introducing data and time was not loaded.");
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "";
  }

  /**
   * Set date and time for the reservation
   * */
  public void setUpDateAndTime() {
    WebElement arrowButton = getDriver().findElementDynamic(arrowSearch);
    WebElement ticButton = getDriver().findElementDynamic(ticSearch);
    arrowButton.click();
    ticButton.click();
  }

}
