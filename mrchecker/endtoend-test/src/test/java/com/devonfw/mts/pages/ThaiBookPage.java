package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.data.Reservation;
import com.devonfw.mts.common.utils.Utils;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
public class ThaiBookPage extends BasePage {

  private static final By dateSearch = By.cssSelector("input[formcontrolname='bookingDate']");

  private static final By nameSearch = By.cssSelector("input[formcontrolname='name']");

  private static final By emailSearch = By.cssSelector("input[formcontrolname='email']");

  private static final By guestsSearch = By.cssSelector("input[formcontrolname='assistants']");

  private static final By dialogSearch = By.className("bgc-green-600");

  @Override
  public boolean isLoaded() {

    WebElement dateInput = getDriver().findElementDynamic(dateSearch);

    return dateInput.isDisplayed();
  }

  @Override
  public void load() {

    BFLogger.logError("MyThaiStar book page was not loaded.");
  }

  @Override
  public String pageTitle() {

    return "";
  }

  public void enterTimeAndDate(String Date) {

    WebElement dateInput = getDriver().findElementDynamic(dateSearch);
    Utils.sendKeysWithCheck(Date, dateSearch, getDriver(), getWebDriverWait());
  }

  public void enterName(String name) {

    WebElement nameInput = getDriver().findElementDynamic(nameSearch);
    Utils.sendKeysWithCheck(name, nameSearch, getDriver(), getWebDriverWait());
  }

  public void enterEmail(String email) {

    WebElement emailInput = getDriver().findElementDynamic(emailSearch);
    Utils.sendKeysWithCheck(email, emailSearch, getDriver(), getWebDriverWait());
  }

  public void enterGuests(int amountOfGuests) {

    WebElement guestsInput = getDriver().findElementDynamic(guestsSearch);
    Utils.sendKeysWithCheck(Integer.toString(amountOfGuests), guestsSearch, getDriver(), getWebDriverWait());
  }

  public void acceptTerms() {

    WebElement checkbox = getDriver().findElementDynamic(By.cssSelector("mat-checkbox[data-name='bookTableTerms']"));
    WebElement square = checkbox.findElement(By.className("mat-checkbox-inner-container"));
    square.click();

  }

  public void clickBookTable() {

    WebElement buttonbutton = getDriver().findElementDynamic(By.name("bookTableSubmit"));
    buttonbutton.click();
  }

  public ThaiConfirmBookPage enterBookingData(Reservation reservation) {

    enterTimeAndDate(reservation.getDate());
    enterName(reservation.getName());
    enterEmail(reservation.getEmail());
    enterGuests(reservation.getGuests());
    acceptTerms();
    clickBookTable();

    return new ThaiConfirmBookPage();
  }

  public boolean checkConfirmationDialog() {

    WebElement greenConfirmationDialog = getDriver().findElementDynamic(dialogSearch);
    return greenConfirmationDialog.isDisplayed();
  }

}
