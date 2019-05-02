package com.devonfw.application.mtsj.predictionmanagement.common.api.to;

import java.util.List;

import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;
import com.devonfw.module.basic.common.api.to.AbstractTo;

/**
 * Entity transport object of PredictionData
 */
public class PredictionDataTo extends AbstractTo {

  private static final long serialVersionUID = 1L;

  private List<PredictionDayData> data;

  public List<PredictionDayData> getData() {

    return this.data;
  }

  public void setData(List<PredictionDayData> data) {

    this.data = data;
  }

}
