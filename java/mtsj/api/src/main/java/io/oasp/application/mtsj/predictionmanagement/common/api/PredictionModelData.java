package io.oasp.application.mtsj.predictionmanagement.common.api;

import net.sf.mmm.util.entity.api.Entity;

/**
 * Prediction model metadata
 */
public interface PredictionModelData extends Entity {

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
   * @param key the model property key
   */
  public void setKey(String key);

  /**
   * @return the model property value
   */
  public String getValue();

  /**
   * Set the model property value
   * @param value the model property value
   */
  public void setValue(String value);
}
