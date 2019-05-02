package com.devonfw.application.mtsj.predictionmanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

/**
 * Prediction model metadata
 */
public interface PredictionModelData extends ApplicationEntity {

  /**
   * @return the ID of the dish that the model can predict
   */
  public Long getDishId();

  /**
   * @return the model property key
   */
  public String getKey();

  /**
   * Set the model property key
   *
   * @param key the model property key
   */
  public void setKey(String key);

  /**
   * @return the model property value
   */
  public String getValue();

  /**
   * Set the model property value
   *
   * @param value the model property value
   */
  public void setValue(String value);
}
