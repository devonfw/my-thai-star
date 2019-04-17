package com.devonfw.application.mtsj.predictionmanagement.logic.api;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionSearchCriteriaTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;

/**
 * Interface for Predictionmanagement component.
 */
public interface Predictionmanagement {

  PredictionDataTo getNextWeekPrediction(PredictionSearchCriteriaTo criteria);

}
