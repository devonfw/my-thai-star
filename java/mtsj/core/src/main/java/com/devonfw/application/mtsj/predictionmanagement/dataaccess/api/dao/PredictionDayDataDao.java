package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao;

import java.util.List;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.module.jpa.dataaccess.api.Dao;

/**
 * Data access interface for PredictionDayData entities
 */
public interface PredictionDayDataDao extends Dao<PredictionDayDataEntity> {

  List<PredictionDayDataEntity> getPrediction(PredictionCriteriaEto criteria);
}
