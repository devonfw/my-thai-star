package io.oasp.application.mtsj.predictionmanagement.logic.api.to;

import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

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
