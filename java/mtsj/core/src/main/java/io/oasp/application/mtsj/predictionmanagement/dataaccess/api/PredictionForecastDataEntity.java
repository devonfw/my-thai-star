package io.oasp.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionForecastData;

@Entity
@Table(name = "PREDICTION_FORECAST_DATA")
public class PredictionForecastDataEntity implements PredictionForecastData {

  private static final long serialVersionUID = 1L;

  private Integer timestamp;
  private Double temperature;
  private Integer holiday;

  @Id
  @Override
  public Integer getTimestamp() {

    return this.timestamp;
  }

  @Override
  public void setTimestamp(Integer timestamp) {

    this.timestamp = timestamp;
  }

  @Override
  public Double getTemperature() {

    return this.temperature;
  }

  @Override
  public void setTemperature(Double temperature) {

    this.temperature = temperature;
  }

  @Override
  public Integer getHoliday() {

    return this.holiday;
  }

  @Override
  public void setHoliday(Integer holiday) {

    this.holiday = holiday;
  }
}
