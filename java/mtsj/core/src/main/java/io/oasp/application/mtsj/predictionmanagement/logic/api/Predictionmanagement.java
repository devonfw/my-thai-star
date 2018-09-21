package io.oasp.application.mtsj.predictionmanagement.logic.api;

import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDataCto;

/**
 * Interface for Predictionmanagement component.
 */
public interface Predictionmanagement {

  PredictionDataCto getNextWeekPrediction(PredictionCriteriaEto criteria);

}
