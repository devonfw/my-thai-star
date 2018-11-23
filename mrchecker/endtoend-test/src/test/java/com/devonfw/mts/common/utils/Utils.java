package com.devonfw.mts.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.capgemini.mrchecker.selenium.core.newDrivers.INewWebDriver;

/**
 * @author Juan Andrés Ambuludi Olmedo
 * @author Jorge Dacal Cantos
 * @author Carlos Micó Egea
 */
public class Utils {
  public static String getRandomEmail(String name) {

    Random random = new Random();
    int rint = random.nextInt(1000);
    return name + "_" + rint + "_@test.com";
  }

  public static String getTomorrowDate() {

    Calendar calendar = Calendar.getInstance();
    calendar.add(Calendar.DAY_OF_YEAR, 1);
    return new SimpleDateFormat("MM/dd/yyyy hh:mm a").format(calendar.getTime());
  }

  public static int getRandom1toMax(int max) {

    Random random = new Random();
    return random.nextInt(max) + 1;
  }

  public static String changeDateFormat(String oldDate, String oldFormat, String newFormat) throws ParseException {

    SimpleDateFormat dateFormat = new SimpleDateFormat(oldFormat);
    Date date = dateFormat.parse(oldDate);
    dateFormat.applyPattern(newFormat);

    return dateFormat.format(date);
  }

  public static void sendKeysWithCheck(String text, By textFieldSearchCriteria, INewWebDriver driver,
      WebDriverWait wait, int index) {

    boolean writtenCorrectly;
    WebElement textField;
    char character;

    for (int i = 0; i < text.length(); i++) {
      character = text.charAt(i);
      writtenCorrectly = false;
      while (!writtenCorrectly) {

        textField = driver.findElementDynamics(textFieldSearchCriteria).get(index);
        textField.sendKeys(character + "");
        try {

          int l = i;
          wait.until((WebDriver wd) -> driver.findElementDynamic(textFieldSearchCriteria).getAttribute("value")
              .length() == l + 1);
          writtenCorrectly = true;
        } catch (TimeoutException e) {

          System.out.println("Character not written: " + character);
          System.out.println("Waiting for it to be written...");
        }
      }
      // System.out.println("Progress: " + text.substring(0, i + 1));
    }

  }

  public static void sendKeysWithCheck(String text, By textFieldSearchCriteria, INewWebDriver driver,
      WebDriverWait wait) {

    int index = 0;
    sendKeysWithCheck(text, textFieldSearchCriteria, driver, wait, index);
  }
}
