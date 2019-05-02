package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;

@Entity
@Table(name = "PREDICTION_ALL_FORECAST")
public class PredictionDayDataEntity extends ApplicationPersistenceEntity implements PredictionDayData {

  private static final long serialVersionUID = 1L;

  private DishEntity dish;

  private Integer timestamp;

  private Double forecast;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "IDDISH")
  public DishEntity getDish() {

    return this.dish;
  }

  public void setDish(DishEntity dish) {

    this.dish = dish;
  }

  @Transient
  public Long getDishId() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getId();
  }

  public void setDishId(Long dishId) {

    if (dishId == null) {
      this.dish = null;
    } else {
      DishEntity dishEntity = new DishEntity();
      dishEntity.setId(dishId);
      this.dish = dishEntity;
    }
  }

  @Transient
  public String getDishName() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getName();
  }

  public void setDishName(String dishName) {

    if (dishName == null) {
      this.dish = null;
    } else {
      DishEntity dishEntity = new DishEntity();
      dishEntity.setName(dishName);
      this.dish = dishEntity;
    }
  }

  public Integer getTimestamp() {

    return this.timestamp;
  }

  public void setTimestamp(Integer timestamp) {

    this.timestamp = timestamp;
  }

  public Double getForecast() {

    return this.forecast;
  }

  public void setForecast(Double forecast) {

    this.forecast = forecast;
  }

}
