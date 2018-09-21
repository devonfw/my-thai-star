package com.devonfw.application.mtsj.predictionmanagement.common.api;

import java.util.List;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface PredictionData extends ApplicationEntity {

  /**
   * @return the list of prediction data for individual days
   */
  public List<PredictionDayData> getData();

  /**
   * Set the prediction data
   * @param data the list of prediction data for individual days
   */
  public void setData(List<PredictionDayData> data);

}
