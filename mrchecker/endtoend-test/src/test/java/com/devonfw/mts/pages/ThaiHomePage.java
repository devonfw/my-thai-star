package com.devonfw.mts.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.selenium.core.exceptions.BFElementNotFoundException;
import com.devonfw.mts.common.readProperties.ConfigFileReader;

public class ThaiHomePage extends BasePage {

  /** File reader */
  private static final ConfigFileReader configFileReader = new ConfigFileReader();

  /** My thai start application URL */
  private static final String mythaistarUrl = configFileReader.getProperty("mythaistar.url");

  /** Login button search criteria */
  private static final By loginButtonSearch = By.name("login");

  /** Logout button search criteria */
  private static final By logoutButtonSearch = By.name("account");

  /** Label login search criteria */
  private static final By labelLoginSearch = By.xpath("//span[@data-name='userNameLogged']");

  /** Menu tab search criteria */
  private static final By menuTabSearch = By.xpath("//a[@routerlink='/menu']");

  /** Book a table button search criteria */
  private static final By bookTableButtonSearch = By.name("buttons.bookTableNavigate");

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    if (getDriver().getTitle().equals(pageTitle())) {
      return true;
    }
    return false;
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    getDriver().get(mythaistarUrl);
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "My Thai Star";
  }

  /**
   * Seek for the login button and click it
   *
   * @return ThaiLoginPage an object that represents the login page
   */
  public ThaiLoginPage clickLogInButton() {
    WebElement loginButton = getDriver().findElementDynamic(loginButtonSearch);
    loginButton.click();

    return new ThaiLoginPage();
  }

  /**
   * Seek for the login button and logs out
   */
  public void clickLogOutButton() {
    WebElement logoutButton = getDriver().findElementDynamic(logoutButtonSearch);
    logoutButton.click();

    String scriptClick = "var we = document.getElementsByClassName(\"mat-menu-item\"); we[we.length-1].click();";
    JavascriptExecutor js = (JavascriptExecutor) getDriver();
    js.executeScript(scriptClick);
  }

  /**
   * Seek for the menu button and click it
   *
   * @return ThaiMenuPage an object that represents the reservations page
   */
  public ThaiMenuPage clickMenuButton() {
    WebElement menuTab = getDriver().findElementDynamic(menuTabSearch);
    menuTab.click();

    return new ThaiMenuPage();
  }

  /**
   * Checks whether an user is logged or not
   *
   * @param username The user to be checked
   * @return boolean true if the user is logged else false
   */
  public boolean isUserLogged(String username) {
    try {
      List<WebElement> accessButton = getDriver().findElementDynamics(labelLoginSearch);
      if (accessButton.size() > 0 && accessButton.get(0).getText().equals(username)) {
        return true;
      }
    } catch (BFElementNotFoundException e) {
    }

    return false;
  }

  /**
  * Checks whether an user is logged or not
  *
  * @return boolean true if any user is logged else false
  */
  public boolean isUserLogged() {
    try {
      List<WebElement> accessButton = getDriver().findElementDynamics(labelLoginSearch, 3);
      if (accessButton.size() > 0 && accessButton.get(0).getText().length() > 0) {
        return true;
      }
    } catch (BFElementNotFoundException e) {
    }

    return false;
  }


  /**
   * Click on the button used to book tables
   *
   * @return A Page that represents the Booking UI
   * */
  public ThaiBookPage clickBookTable() {
    WebElement bookTableButton = getDriver().findElementDynamic(bookTableButtonSearch);
    bookTableButton.click();

    return new ThaiBookPage();

  }
}
