package com.devonfw.application.mtsj.predictionmanagement.common.api;

/**
 * Prediction forecast data for a point in time
 */
public interface PredictionForecastData {

  /**
   * @return the time index of the prediction
   */
  public int getTimestamp();

  /**
   * Set the time index of the prediction
   *
   * @param timestamp the time index of the prediction
   */
  public void setTimestamp(int timestamp);

  /**
   * @return the predicted temperature
   */
  public double getTemperature();

  /**
   * Set the predicted temperature
   *
   * @param temperature the predicted temperature
   */
  public void setTemperature(double temperature);

  /**
   * @return whether the prediction is for a holiday (1) or not (0)
   */
  public int getHoliday();

  /**
   * Set whether the prediction is for a holiday (1) or not (0)
   *
   * @param holiday whether the prediction is for a holiday (1) or not (0)
   */
  public void setHoliday(int holiday);
}
