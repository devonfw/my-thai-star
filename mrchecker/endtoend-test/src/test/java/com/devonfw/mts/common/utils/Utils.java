package com.devonfw.mts.common.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

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
}
