package io.oasp.application.mtsj.predictionmanagement.logic.api;

import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDataTo;

/**
 * Interface for Predictionmanagement component.
 */
public interface Predictionmanagement {

  PredictionDataTo getNextWeekPrediction(PredictionCriteriaEto criteria);

}
