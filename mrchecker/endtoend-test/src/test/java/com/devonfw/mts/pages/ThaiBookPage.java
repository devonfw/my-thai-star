package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.data.Reservation;
import com.devonfw.mts.common.utils.Utils;

public class ThaiBookPage extends BasePage {

  /** Date field search criteria */
  private static final By dateSearch = By.cssSelector("input[formcontrolname='bookingDate']");

  /** Name input field search criteria */
  private static final By nameSearch = By.cssSelector("input[formcontrolname='name']");

  /** Email input field search criteria */
  private static final By emailSearch = By.cssSelector("input[formcontrolname='email']");

  /** Number of guests search criteria */
  private static final By guestsSearch = By.cssSelector("input[formcontrolname='assistants']");

  /** Check box search criteria */
  private static final By checkboxSearch = By.cssSelector("mat-checkbox[data-name='bookTableTerms']");

  /** Dialog search criteria */
  private static final By dialogSearch = By.className("bgc-green-600");

  /**
   * {@inheritDoc}
   * */
  @Override
  public boolean isLoaded() {
    WebElement dateInput = getDriver().findElementDynamic(dateSearch);

    return dateInput.isDisplayed();
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public void load() {
    BFLogger.logError("MyThaiStar book page was not loaded.");
  }

  /**
   * {@inheritDoc}
   * */
  @Override
  public String pageTitle() {
    return "";
  }

  /**
   * @param Date for the reservation
   */
    public void enterTimeAndDate(String Date) {
    WebElement dateInput = getDriver().findElementDynamic(dateSearch);
    Utils.sendKeysWithCheck(Date, dateSearch, getDriver(), getWebDriverWait());
  }

  /**
   * @param name used for the reservation.
   */
  public void enterName(String name) {
    WebElement nameInput = getDriver().findElementDynamic(nameSearch);
    Utils.sendKeysWithCheck(name, nameSearch, getDriver(), getWebDriverWait());
  }

  /**
   * @param email. Email for the reservation form
   */
  public void enterEmail(String email) {
    WebElement emailInput = getDriver().findElementDynamic(emailSearch);
    Utils.sendKeysWithCheck(email, emailSearch, getDriver(), getWebDriverWait());
  }

  /**
   * @param amountOfGuests
   */
  public void enterGuests(int amountOfGuests) {
    WebElement guestsInput = getDriver().findElementDynamic(guestsSearch);
    Utils.sendKeysWithCheck(Integer.toString(amountOfGuests), guestsSearch, getDriver(), getWebDriverWait());
  }

  /**
   * Accept terms and conditions of service
   */
  public void acceptTerms() {
    WebElement checkbox = getDriver().findElementDynamic(checkboxSearch);
    WebElement square = checkbox.findElement(By.className("mat-checkbox-inner-container"));
    JavascriptExecutor js = (JavascriptExecutor) getDriver();
    js.executeScript("arguments[0].click()", square);

  }

  /**
   * Submit data and book a table
   */
  public void clickBookTable() {
    WebElement buttonbutton = getDriver().findElementDynamic(By.name("bookTableSubmit"));
    buttonbutton.click();
  }

  /**
   * @param reservation object
   * @return Confirmation dialog.
   */
  public ThaiConfirmBookPage enterBookingData(Reservation reservation) {
    enterTimeAndDate(reservation.getDate());
    enterName(reservation.getName());
    enterEmail(reservation.getEmail());
    enterGuests(reservation.getGuests());
    acceptTerms();
    clickBookTable();

    return new ThaiConfirmBookPage();
  }

  /**
   * @return
   */
  public boolean checkConfirmationDialog() {
    WebElement greenConfirmationDialog = getDriver().findElementDynamic(dialogSearch);

    return greenConfirmationDialog.isDisplayed();
  }

}
