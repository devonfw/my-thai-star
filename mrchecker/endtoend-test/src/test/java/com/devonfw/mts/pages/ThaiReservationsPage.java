/**
 *
 */
package com.devonfw.mts.pages;

import java.text.ParseException;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;

import com.capgemini.mrchecker.selenium.core.BasePage;
import com.capgemini.mrchecker.test.core.logger.BFLogger;
import com.devonfw.mts.common.data.Reservation;
import com.devonfw.mts.common.utils.Utils;

/**
 * @author jambulud
 */
public class ThaiReservationsPage extends BasePage {

  /* Search criteria */
  private static final By reservationsTableSearch = By.xpath("//tbody[@class='td-data-table-body']/tr");

  // private static final By nextPageSearch = By.xpath("//button[@class=\"td-paging-bar-next-page mat-icon-button\"]");

  private static final By searchBarFilter = By.className("td-expansion-panel-header-content");

  private static final By emailInputSearch = By.xpath("//input[@name=\"email\"]");

  private static final By submitButtonSearch = By.xpath("//button[@type='submit']");

  // private static final By byblabla = By.xpath("//td-expansion-panel[@data-name='reservationFilter']");

  /* Map to store email/reservation id data */
  private Map<String, List<String>> tableData;

  @Override
  public boolean isLoaded() {

    getDriver().waitForPageLoaded();

    return getDriver().getCurrentUrl().contains("reservations");
  }

  @Override
  public void load() {

    BFLogger.logError("MyThaiStar reservation page was not loaded.");

  }

  @Override
  public String pageTitle() {

    return "";
  }

  /**
   * Method to get the reservations for a given email
   *
   * @return List<String> a list of booking ids for that email
   */
  public List<String> findReservationsIdByEmail(String email) {

    return this.tableData.getOrDefault(email, new LinkedList<String>());
  }

  /**
   * @return
   */
  /*
   * public Map<String, List<Reservation>> getAllReservations() {
   *
   * Map<String, List<Reservation>> idReservations = new HashMap<>(); WebElement nextPage =
   * getDriver().findElementDynamic(nextPageSearch); int i = 0;
   *
   * boolean b = false; while (!b) { System.out.println("PRUEBA " + i + " " + b); idReservations =
   * getReservations(idReservations);
   *
   * JavascriptExecutor js = ((JavascriptExecutor) getDriver()); i++;
   *
   * nextPage.click(); // (getDriver().waitForPageLoaded(); // getDriver().waitForElement(nextPageSearch); nextPage =
   * getDriver().findElementDynamic(nextPageSearch, 35); b = (Boolean) js.executeScript("return arguments[0].disabled",
   * nextPage); }
   *
   * return idReservations; }
   */

  /**
   * @param date
   * @return
   */
  /*
   * public boolean AreThereReservations(String date) {
   *
   * return getAllReservations().getOrDefault(date, null) == null; }
   *
   * public ThaiTableBodyPage nextPage() {
   *
   * Button nextPage = getDriver().elementButton(nextPageSearch); nextPage.click();
   *
   * return new ThaiTableBodyPage(); }
   *
   * public Map<String, List<Reservation>> getAllReservationsRare() {
   *
   * ThaiTableBodyPage thaiTable = new ThaiTableBodyPage(); Map<String, List<Reservation>> idReservations = new
   * HashMap<>(); idReservations = thaiTable.getReservations(idReservations);
   *
   * int i = 1;
   *
   * while (thaiTable.isThereANextPage()) { System.out.println("PRUEBA: " + i); thaiTable = thaiTable.nextPage();
   * idReservations = thaiTable.getReservations(idReservations); i++; }
   *
   * return idReservations; }
   */

  public HashMap<String, List<Reservation>> searchDatesByEmail(String email) {

    WebElement searchBar = getDriver().findElementDynamic(searchBarFilter);

    JavascriptExecutor js = (JavascriptExecutor) getDriver();
    js.executeScript("arguments[0].click()", searchBar);

    try {
      getDriver().findElementDynamic(By.xpath("adasd"), 2);
    } catch (Exception e) {

    }

    int index = 1;

    Utils.sendKeysWithCheck(email, emailInputSearch, getDriver(), getWebDriverWait(), index);
    WebElement button = getDriver().findElementDynamic(submitButtonSearch);
    button.click();

    try {
      getDriver().findElementDynamics(By.cssSelector("fskjacb"), 2);
    } catch (Exception e) {

    }

    HashMap<String, List<Reservation>> idReservations = new HashMap<>();
    return getReservationsShownByDate(idReservations);
  }

  /**
   * @return
   */
  private HashMap<String, List<Reservation>> getReservationsShownByDate(
      HashMap<String, List<Reservation>> idReservations) {

    List<WebElement> reservations;
    List<Reservation> reservationsByDate;
    String date, id, email;

    reservations = getDriver().findElementDynamics(reservationsTableSearch);

    for (int i = 1; i <= reservations.size(); i++) {
      System.out.println(reservations.size());

      date = getDriver().findElementDynamic(findDataCell(i, 1)).getText();
      email = getDriver().findElementDynamic(findDataCell(i, 2)).getText();
      id = getDriver().findElementDynamic(findDataCell(i, 3)).getText();
      try {
        date = Utils.changeDateFormat(date, "MMM dd, yyyy hh:mm a", "MM/dd/yyyy hh:mm a");
      } catch (ParseException e) {
        System.err.println("Date not formated properly at getReservationsShownByDate in ThaiReservationsPage");
        e.printStackTrace();
      }

      System.out.printf("date: %s, email: %s, id: %s\n", date, email, id);

      reservationsByDate = idReservations.getOrDefault(date, new LinkedList<Reservation>());
      reservationsByDate.add(new Reservation(date, email, id));

      idReservations.put(date, reservationsByDate);
    }

    return idReservations;
  }

  public By findDataCell(int indexRow, int indexCol) {

    return By.xpath("//tbody[@class='td-data-table-body']/tr[" + indexRow + "]/td[" + indexCol + "]//span");
  }

}
