package com.devonfw.application.mtsj.predictionmanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.application.mtsj.general.logic.base.AbstractComponentFacade;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDayDataEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionDayDataDao;
import com.devonfw.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;

/**
 * Implementation of component interface of predictionmanagement
 */
@Named
@Transactional
public class PredictionmanagementImpl extends AbstractComponentFacade implements Predictionmanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(PredictionmanagementImpl.class);

  @Inject
  private PredictionDayDataDao predictionDayDataDao;

  /**
   * The constructor.
   */
  public PredictionmanagementImpl() {

    super();
  }

  public PredictionDayDataDao getPredictionDayDataDao() {

    return this.predictionDayDataDao;
  }

  @Override
  @RolesAllowed(Roles.MANAGER)
  public PredictionDataTo getNextWeekPrediction(PredictionCriteriaEto criteria) {

    LOG.debug("Generate predictions for next week.");

    PredictionDataTo predictionDataTo = new PredictionDataTo();
    List<PredictionDayData> predictionDayDataEtos = new ArrayList<>();

    for (PredictionDayDataEntity entity : getPredictionDayDataDao().getPrediction(criteria)) {
      PredictionDayDataEto predictionDayDataEto = new PredictionDayDataEto();
      predictionDayDataEto.setId(entity.getId());
      predictionDayDataEto.setDishId(entity.getDishId());
      predictionDayDataEto.setDishName(entity.getDishName());
      predictionDayDataEto.setTimestamp(entity.getTimestamp());
      predictionDayDataEto.setForecast(entity.getForecast());
      predictionDayDataEtos.add(predictionDayDataEto);
    }

    predictionDataTo.setData(predictionDayDataEtos);

    return predictionDataTo;
  }

}
