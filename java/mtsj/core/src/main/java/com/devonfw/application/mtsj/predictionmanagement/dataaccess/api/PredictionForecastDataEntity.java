package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionForecastData;

@Entity
@Table(name = "PREDICTION_FORECAST_DATA")
public class PredictionForecastDataEntity extends ApplicationPersistenceEntity implements PredictionForecastData {

  private static final long serialVersionUID = 1L;

  private int timestamp;

  private double temperature;

  private int holiday;

  // @Id
  public int getTimestamp() {

    return this.timestamp;
  }

  public void setTimestamp(int timestamp) {

    this.timestamp = timestamp;
  }

  public double getTemperature() {

    return this.temperature;
  }

  public void setTemperature(double temperature) {

    this.temperature = temperature;
  }

  public int getHoliday() {

    return this.holiday;
  }

  public void setHoliday(int holiday) {

    this.holiday = holiday;
  }
}
