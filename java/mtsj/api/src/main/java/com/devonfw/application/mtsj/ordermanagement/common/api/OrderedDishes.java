package com.devonfw.application.mtsj.ordermanagement.common.api;

import java.sql.Timestamp;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

/**
 * The number of ordered dished given a date and a temperature
 */
public interface OrderedDishes extends ApplicationEntity {

  /**
   * @return the order date
   */
  public Timestamp getBookingdate();

  /**
   * Set the order date
   * @param bookingdate the order date
   */
  public void setBookingdate(Timestamp bookingdate);

  /**
   * @return the mean temperature in the order period (time/day/month)
   */
  public Double getTemperature();

  /**
   * Set the mean temperature in the order period (time/day/month)
   * @param temperature the mean temperature on the order date
   */
  public void setTemperature(Double temperature);

  /**
   * @return the number of ordered dishes
   */
  public Integer getAmount();

  /**
   * Set the number of ordered dishes
   * @param amount the number of ordered dishes
   */
  public void setAmount(Integer amount);

}
