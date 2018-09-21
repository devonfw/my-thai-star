package io.oasp.application.mtsj.predictionmanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.general.common.api.constants.Roles;
import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionDayData;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionDayDataDao;
import io.oasp.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDataCto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDataEto;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionDayDataEto;

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
  public PredictionDataCto getNextWeekPrediction(PredictionCriteriaEto criteria) {

    LOG.debug("Generate predictions for next week.");

    PredictionDataCto predictionDataCto = new PredictionDataCto();
    PredictionDataEto predictionDataEto = new PredictionDataEto();
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

    predictionDataEto.setData(predictionDayDataEtos);
    predictionDataCto.setPredictionData(predictionDataEto);

    return predictionDataCto;
  }

}
