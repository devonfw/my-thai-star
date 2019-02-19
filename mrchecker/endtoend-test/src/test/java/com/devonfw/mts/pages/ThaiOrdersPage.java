package com.devonfw.mts.pages;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class ThaiOrdersPage extends BasePage {

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
    BFLogger.logError("MyThaiStar order page was not loaded.");
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "";
  }

}
