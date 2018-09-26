package com.devonfw.mts.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
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

  // private static final By inputFieldsSearch = By.xpath("//div[@class='mat-form-field-infix']");

  private static final By dateSearch = By.cssSelector("input[formcontrolname='bookingDate']");

  private static final By nameSearch = By.cssSelector("input[formcontrolname='name']");

  private static final By emailSearch = By.cssSelector("input[formcontrolname='email']");

  private static final By guestsSearch = By.cssSelector("input[formcontrolname='assistants']");

  // private static final By checkboxSearch = By.className("mat-checkbox");

  // private static final String xpathBookTableButton =
  // "//*[@id='mat-tab-content-0-0']/div/div/div[2]/form/div[3]/button";

  // private static final By bookTableButtonSearch = By.xpath(xpathBookTableButton);

  // private static final By headerSearch = By.tagName("h3");

  private static final By dialogSearch = By.className("bgc-green-600");

  @Override
  public boolean isLoaded() {

    // String text = "You can invite your friends to lunch or book a table";
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
    // dateInput.sendKeys(Date);
  }

  public void enterName(String name) {

    WebElement nameInput = getDriver().findElementDynamic(nameSearch);
    Utils.sendKeysWithCheck(name, nameSearch, getDriver(), getWebDriverWait());
    // nameInput.sendKeys(name);
  }

  public void enterEmail(String email) {

    WebElement emailInput = getDriver().findElementDynamic(emailSearch);
    Utils.sendKeysWithCheck(email, emailSearch, getDriver(), getWebDriverWait());
    // emailInput.sendKeys(email);
  }

  public void enterGuests(int amountOfGuests) {

    WebElement guestsInput = getDriver().findElementDynamic(guestsSearch);
    Utils.sendKeysWithCheck(Integer.toString(amountOfGuests), guestsSearch, getDriver(), getWebDriverWait());
    // guestsInput.sendKeys(Integer.toString(amountOfGuests));
  }

  public void acceptTerms() {

    JavascriptExecutor js = (JavascriptExecutor) getDriver();
    js.executeScript("document.getElementsByClassName('mat-checkbox-inner-container')[1].click();");
    // WebElement checkbox = getDriver()
    // .findElementDynamics(By.cssSelector("label.mat-checkbox-layout > div.mat-checkbox-inner-container")).get(1);
    // checkbox.click();

    // System.out.println("OBTAIN CHECKBOX PARENT ID");
    // WebElement checkboxParent = getDriver()
    // .findElement(By.xpath("//ancestors::div[@class='mat-checkbox-inner-container']"));
    // System.out.println("OBTAIN CHECKBOX PARENT 2");
    // String checkboxParent_id = checkboxParent.getAttribute("id");
    // System.out.println("CHECKBOX PARENT ID: " + checkboxParent_id);
    // WebElement checkbox = getDriver().findElement(
    // By.cssSelector("#" + checkboxParent_id + " > label.mat-checkbox-layout > div.mat-checkbox-inner-container"));
    // checkbox.click();

  }

  public void clickBookTable() {

    JavascriptExecutor js = (JavascriptExecutor) getDriver();
    js.executeScript("document.getElementsByTagName('button')[8].click();");

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
