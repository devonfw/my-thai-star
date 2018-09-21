package io.oasp.application.mtsj.predictionmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of PredictionData
 */
public class PredictionDataCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private PredictionDataEto predictionData;

  public PredictionDataEto getPredictionData() {

    return this.predictionData;
  }

  public void setPredictionData(PredictionDataEto predictionData) {

    this.predictionData = predictionData;
  }

}
