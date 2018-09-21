package io.oasp.application.mtsj.predictionmanagement.dataaccess.api.dao;

import java.util.List;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;

/**
 * Data access interface for PredictionDayData entities
 */
public interface PredictionDayDataDao extends ApplicationDao<PredictionDayDataEntity> {

  List<PredictionDayDataEntity> getPrediction(PredictionCriteriaEto criteria);
}
