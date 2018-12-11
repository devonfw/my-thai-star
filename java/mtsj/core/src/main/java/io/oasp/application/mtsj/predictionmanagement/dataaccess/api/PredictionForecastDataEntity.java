package io.oasp.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionForecastData;

@Entity
@Table(name = "PREDICTION_FORECAST_DATA")
public class PredictionForecastDataEntity implements PredictionForecastData {

  private static final long serialVersionUID = 1L;

  private int timestamp;
  private double temperature;
  private int holiday;

  @Id
  @Override
  public int getTimestamp() {

    return this.timestamp;
  }

  @Override
  public void setTimestamp(int timestamp) {

    this.timestamp = timestamp;
  }

  @Override
  public double getTemperature() {

    return this.temperature;
  }

  @Override
  public void setTemperature(double temperature) {

    this.temperature = temperature;
  }

  @Override
  public int getHoliday() {

    return this.holiday;
  }

  @Override
  public void setHoliday(int holiday) {

    this.holiday = holiday;
  }
}
