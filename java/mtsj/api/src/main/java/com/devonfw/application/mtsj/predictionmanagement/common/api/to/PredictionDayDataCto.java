package com.devonfw.application.mtsj.predictionmanagement.common.api.to;

import com.devonfw.application.mtsj.dishmanagement.common.api.to.DishEto;
import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of PredictionDayData
 */
public class PredictionDayDataCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private PredictionDayDataEto predictionDayData;

  private DishEto dish;
  private Long ordersAmount;

  public PredictionDayDataEto getPredictionDayData() {

    return this.predictionDayData;
  }

  public void setPredictionDayData(PredictionDayDataEto predictionDayData) {

    this.predictionDayData = predictionDayData;
  }

  public DishEto getDish() {

    return this.dish;
  }

  public void setDish(DishEto dish) {

    this.dish = dish;
  }

  public Long getOrdersAmount() {

    return this.ordersAmount;
  }

  public void setOrdersAmount(Long ordersAmount) {

    this.ordersAmount = ordersAmount;
  }

}
