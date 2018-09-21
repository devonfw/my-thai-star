package io.oasp.application.mtsj.predictionmanagement.common.api;

import net.sf.mmm.util.entity.api.Entity;

/**
 * Prediction forecast data for a point in time
 */
public interface PredictionForecastData extends Entity {

  /**
   * @return the time index of the prediction
   */
  public Integer getTimestamp();

  /**
   * Set the time index of the prediction
   * @param timestamp the time index of the prediction
   */
  public void setTimestamp(Integer timestamp);

  /**
   * @return the predicted temperature
   */
  public Double getTemperature();

  /**
   * Set the predicted temperature
   * @param temperature the predicted temperature
   */
  public void setTemperature(Double temperature);

  /**
   * @return whether the prediction is for a holiday (1) or not (0)
   */
  public Integer getHoliday();

  /**
   * Set whether the prediction is for a holiday (1) or not (0)
   * @param holiday whether the prediction is for a holiday (1) or not (0)
   */
  public void setHoliday(Integer holiday);
}
