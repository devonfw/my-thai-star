/**
 *
 */
package com.devonfw.mts.pages;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.selenium.core.exceptions.BFElementNotFoundException;
import com.devonfw.mts.common.readProperties.ConfigFileReader;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */

// @Configuration // no se si esto hace falta o no, lo he copiado de otra version (Carlos)
// @PropertySource("file:config.properties")
public class ThaiHomePage extends BasePage {

  /* Search criteria */
  private static final ConfigFileReader configFileReader = new ConfigFileReader();

  private static final String mythaistarUrl = configFileReader.getProperty("mythaistar.url");
  // private static final String mythaistarUrl = "http://mts-angular-my-thai-star-mrcheck.10.36.39.36.nip.io/";

  private static final By loginButtonSearch = By.name("login");

  private static final By logoutButtonSearch = By.name("account");

  private static final By labelLoginSearch = By.xpath("//span[@data-name='userNameLogged']");

  private static final By menuTabSearch = By.xpath("//a[@routerlink='/menu']");

  private static final By bookTableButtonSearch = By.name("buttons.bookTableNavigate");

  @Override
  public boolean isLoaded() {

    if (getDriver().getTitle().equals(pageTitle())) {
      return true;
    }
    return false;
  }

  @Override
  public void load() {

    getDriver().get(mythaistarUrl);
    // getDriver().manage().window().maximize();
  }

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
   *
   */
  public void clickLogOutButton() {

    WebElement logoutButton = getDriver().findElementDynamic(logoutButtonSearch);
    logoutButton.click();

    /*
     * WebElement logoutItem = getDriver().findElementDynamic(logoutItemSearch); logoutItem.click();
     */
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

  public ThaiBookPage clickBookTable() {

    WebElement bookTableButton = getDriver().findElementDynamic(bookTableButtonSearch);
    bookTableButton.click();
    return new ThaiBookPage();

  }
}
