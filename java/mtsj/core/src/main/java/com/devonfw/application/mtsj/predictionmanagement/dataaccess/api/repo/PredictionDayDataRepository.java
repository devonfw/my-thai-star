package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.repo;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionSearchCriteriaTo;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link PredictionDayDataEntity}.
 */
public interface PredictionDayDataRepository extends DefaultRepository<PredictionDayDataEntity> {

  @Modifying
  @Query(value = "DELETE FROM PREDICTION_ALL_FORECAST dayData where idDish=:idDish", nativeQuery = true)
  public void deletePredictionDayDatabyDish(@Param("idDish") Long idDish);

  @Modifying
  @Query(value = "DELETE FROM TMP_PREDICTION_FORECAST", nativeQuery = true)
  public void deleteTmpPredictionForecast();

  @Modifying
  @Query(value = "INSERT INTO PREDICTION_ALL_FORECAST (modificationCounter,idDish, dishName, timestamp, forecast) "
      + "SELECT 1 As modificationCounter, ?1 AS idDish, Dish.name AS dishName, timestamp, forecast "
      + "FROM TMP_PREDICTION_FORECAST LEFT JOIN Dish ON Dish.id = ?1", nativeQuery = true)
  public void savePredictions(@Param("idDish") Long idDish);

  // delete old forecast data
  @Modifying
  @Query(value = "DELETE FROM PREDICTION_FORECAST_DATA", nativeQuery = true)
  void deletePredictionForecastData();

  default Page<PredictionDayDataEntity> getPrediction(PredictionSearchCriteriaTo criteria) {

    PredictionDayDataEntity alias = newDslAlias();
    JPAQuery<PredictionDayDataEntity> query = newDslQuery(alias);

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }

}
