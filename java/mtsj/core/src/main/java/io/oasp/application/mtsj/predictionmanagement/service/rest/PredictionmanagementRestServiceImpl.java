package io.oasp.application.mtsj.predictionmanagement.service.rest;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDataCto;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Predictionmanagement}.
 */
@Named("PredictionmanagementRestService")
public class PredictionmanagementRestServiceImpl implements PredictionmanagementRestService {

  @Inject
  private Predictionmanagement predictionmanagement;

  @Override
  public PredictionDataCto getNextWeekPrediction(PredictionCriteriaEto criteria) {

    return this.predictionmanagement.getNextWeekPrediction(criteria);
  }

}
