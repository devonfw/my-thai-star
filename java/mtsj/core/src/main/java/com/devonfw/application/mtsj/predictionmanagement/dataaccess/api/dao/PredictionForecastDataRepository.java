package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao;

import org.springframework.data.jpa.repository.Query;

import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionForecastDataEntity;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;

/**
 * TODO VAPADWAL This type ...
 *
 * @since 1.12.3
 */
public interface PredictionForecastDataRepository extends DefaultRepository<PredictionForecastDataEntity> {
  @Query(value = "DELETE FROM TMP_PREDICTION_FORECAST", nativeQuery = true)
  public void deleteTmpPredictionForecast();

  @Query(value = "CALL _SYS_AFL.PAL_ARIMA_FORECAST(PREDICTION_FORECAST_DATA, TMP_PREDICTION_MODEL, "
      + "PREDICTION_ARIMA_PARAMS, TMP_PREDICTION_FORECAST) WITH OVERVIEW", nativeQuery = true)
  public void doPredictions();

  @Query(value = "INSERT INTO PREDICTION_ALL_FORECAST (idDish, dishName, timestamp, forecast) "
      + "SELECT ?1 AS idDish, Dish.name AS dishName, timestamp, forecast "
      + "FROM TMP_PREDICTION_FORECAST LEFT JOIN Dish ON Dish.id = ?1", nativeQuery = true)
  public void savePredictions(Long idDish);
}
