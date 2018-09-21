package io.oasp.application.mtsj.predictionmanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionData;
import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionDayData;

/**
 * Entity transport object of PredictionData
 */
public class PredictionDataEto extends AbstractEto implements PredictionData {

  private static final long serialVersionUID = 1L;

  private List<PredictionDayData> data;

  @Override
  public List<PredictionDayData> getData() {

    return this.data;
  }

  @Override
  public void setData(List<PredictionDayData> data) {

    this.data = data;
  }

}
