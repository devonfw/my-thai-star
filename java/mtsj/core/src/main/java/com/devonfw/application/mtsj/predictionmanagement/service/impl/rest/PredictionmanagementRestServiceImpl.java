package com.devonfw.application.mtsj.predictionmanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;
import com.devonfw.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import com.devonfw.application.mtsj.predictionmanagement.service.api.rest.PredictionmanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Predictionmanagement}.
 */
@Named("PredictionmanagementRestService")
public class PredictionmanagementRestServiceImpl implements PredictionmanagementRestService {

  @Inject
  private Predictionmanagement predictionmanagement;

  @Override
  public PredictionDataTo getNextWeekPrediction(PredictionCriteriaEto criteria) {

    return this.predictionmanagement.getNextWeekPrediction(criteria);
  }

}
