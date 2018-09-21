package io.oasp.application.mtsj.ordermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import java.sql.Timestamp;

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
   * @return the mean temperature on the order date
   */
  public Double getTemperature();

  /**
   * Set the mean temperature on the order date
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
