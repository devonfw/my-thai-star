package io.oasp.application.mtsj.predictionmanagement.common.api;

import java.util.List;
import java.sql.Timestamp;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface PredictionCriteria extends ApplicationEntity {

  /**
   * @return the type of the prediction (the only valid value is 'prediction')
   */
  public String getType();

  /**
   * Set the type of the prediction (the only valid value is 'prediction')
   * @param type the type of the prediction (the only valid value is 'prediction')
   */
  public void setType(String type);

  /**
   * @return the earliest date to use for the prediction
   */
  public Timestamp getStartBookingdate();

  /**
   * Set the earliest date to use for the prediction
   * @param startBookingdate the earliest date to use for the prediction
   */
  public void setStartBookingdate(Timestamp startBookingdate);

  /**
   * @return the list of temperatures used for the prediction
   */
  public List<Double> getTemperatures();

  /**
   * Set the list of temperatures used for the prediction
   * @param temperatures the list of temperatures used for the prediction
   */
  public void setTemperatures(List<Double> temperatures);

  /**
   * @return the list of holidays used for the prediction
   */
  public List<String> getHolidays();

  /**
   * Set the list of holidays used for the prediction
   * @param holidays the list of holidays used for the prediction
   */
  public void setHolidays(List<String> holidays);

}
