package com.devonfw.application.mtsj.predictionmanagement.common.api.to;

import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of PredictionDayData
 */
public class PredictionDayDataEto extends AbstractEto implements PredictionDayData {

  private static final long serialVersionUID = 1L;

  private Long dishId;
  private String dishName;
  private Integer timestamp;
  private Double forecast;

  @Override
  public Long getDishId() {

    return this.dishId;
  }

  @Override
  public void setDishId(Long dishId) {

    this.dishId = dishId;
  }

  @Override
  public String getDishName() {

    return this.dishName;
  }

  @Override
  public void setDishName(String dishName) {

    this.dishName = dishName;
  }

  @Override
  public Integer getTimestamp() {

    return this.timestamp;
  }

  @Override
  public void setTimestamp(Integer timestamp) {

    this.timestamp = timestamp;
  }

  @Override
  public Double getForecast() {

    return this.forecast;
  }

  @Override
  public void setForecast(Double forecast) {

    this.forecast = forecast;
  }

}
