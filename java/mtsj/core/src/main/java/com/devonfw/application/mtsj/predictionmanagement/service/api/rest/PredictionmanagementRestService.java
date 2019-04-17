package com.devonfw.application.mtsj.predictionmanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionSearchCriteriaTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Predictionmanagement}.
 */
@Path("/predictionmanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface PredictionmanagementRestService {

  /**
   * Delegates to {@link Predictionmanagement#getNextWeekPrediction}.
   *
   * @return the {@link PredictionDataCto}
   */
  @POST
  @Path("/nextweek/")
  public PredictionDataTo getNextWeekPrediction(PredictionSearchCriteriaTo criteria);
}
