package com.devonfw.mts.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.newDrivers.INewWebDriver;
import com.capgemini.mrchecker.test.core.logger.BFLogger;

public class Utils {

  /**
   * Generate a random email
   *
   * @param name. String shown in the email
   * @return String. name_<random_integer>_@test.com
   * */
  public static String getRandomEmail(String name) {
    Random random = new Random();
    int rint = random.nextInt(1000);

    return name + "_" + rint + "_@test.com";
  }

  /**
   * Tomorrow date
   * @return String. Date using the format MM/dd/yyyy hh:mm:a.
   * */
  public static String getTomorrowDate() {
    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.DAY_OF_YEAR, 1);

    return new SimpleDateFormat("MM/dd/yyyy hh:mm a", Locale.ENGLISH).format(calendar.getTime());
  }

  /**
   * Generate random integer
   *
   * @param max. Max integer allowed
   * @return int. Integer between 1 and max.
   * */
  public static int getRandom1toMax(int max) {
    Random random = new Random();

    return random.nextInt(max) + 1;
  }

  /**
   * Change date format
   *
   * @param oldDate.
   * @param oldFormat.
   * @param newFormat.
   * @return oldDate formated as String following the new format (newFormat)
   * */
  public static String changeDateFormat(String oldDate, String oldFormat, String newFormat) throws ParseException {
    SimpleDateFormat dateFormat = new SimpleDateFormat(oldFormat, Locale.ENGLISH);
    Date date = dateFormat.parse(oldDate);
    dateFormat.applyPattern(newFormat);

    return dateFormat.format(date);
  }

  /**
   * Method to write a text checking if each letter is written.
   *
   * @param text. Text to write
   * @param textFieldSearchCriteria. Search criteria.
   * @param driver. Selenium WebDriver.
   * @param wait. Selenium WebDriverWait.
   * @param index. The search criteria is used to search multiple elements.
   * This field is used to choose among them.
   *
   * */
  public static void sendKeysWithCheck(String text, By textFieldSearchCriteria, INewWebDriver driver,
      WebDriverWait wait, int index) {
    boolean writtenCorrectly;
    WebElement textField;
    char character;
    int numOfChars = text.length();

    for (int i = 0; i < numOfChars; i++) {
      character = text.charAt(i);
      writtenCorrectly = false;
      int numOfAttempts = 0;

      while (!writtenCorrectly && numOfAttempts < numOfChars) {

        textField = driver.findElementDynamics(textFieldSearchCriteria).get(index);
        textField.sendKeys(character + "");
		try {

		  int l = i;
		  wait.until((WebDriver wd) -> driver.findElementDynamic(textFieldSearchCriteria).getAttribute("value")
		      .length() == l + 1);
		  writtenCorrectly = true;
		} catch (TimeoutException e) {
		  numOfAttempts++;
		  BFLogger.logInfo("Character not written: " + character);
		  BFLogger.logInfo("Waiting for it to be written...");
	    }
	  }
    }
  }

  /**
  * Method to write a text checking if each letter is written.
  * If multiple fields are found, the text is written in the first one.
  *
  * @param text. Text to write
  * @param textFieldSearchCriteria. Search criteria.
  * @param driver. Selenium WebDriver.
  * @param wait. Selenium WebDriverWait.
  *
  * */
  public static void sendKeysWithCheck(String text, By textFieldSearchCriteria, INewWebDriver driver,
      WebDriverWait wait) {
    int index = 0;
    sendKeysWithCheck(text, textFieldSearchCriteria, driver, wait, index);
  }
}
