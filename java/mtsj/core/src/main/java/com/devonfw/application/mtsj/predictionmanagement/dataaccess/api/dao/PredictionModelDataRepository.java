package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao;

import java.sql.Timestamp;

import org.springframework.data.jpa.repository.Query;

import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionModelDataEntity;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;

/**
 * TODO VAPADWAL This type ...
 *
 * @since 1.12.3
 */
public interface PredictionModelDataRepository extends DefaultRepository<PredictionModelDataEntity> {
  @Query("select count(modelData) from PredictionModelDataEntity modelData where modelData.dish.id=:idDish and modelData.key = '_date' and modelData.value = :startDate ")
  public int isTrainingNecessary(Long idDish, Timestamp startDate);

  @Query("select count(dishEntity) from DishEntity dishEntity")
  public int isTrainingPossible();

  @Query(value = "DELETE FROM TMP_PREDICTION_DATA", nativeQuery = true)
  public void deleteTmpPredictionData();

  @Query(value = "INSERT INTO TMP_PREDICTION_DATA SELECT "
      + "TO_INT(ROW_NUMBER() OVER (ORDER BY BOOKINGDATE)) AS timestamp, "
      + "amount AS orders, temperature, CASE WHEN designation IS NULL THEN 0 ELSE 1 END AS holiday "
      + "FROM OrderedDishesPerDay " + "WHERE idDish = ?1 " + "AND BOOKINGDATE < ?2 "
      + "ORDER BY BOOKINGDATE DESC LIMIT 365")
  public void prepareTrainingData(Long idDish, Timestamp startDate);

  @Query(value = "DELETE FROM TMP_PREDICTION_MODEL", nativeQuery = true)
  public void deleteTmpPredictionModel();

  @Query(value = "DELETE FROM TMP_PREDICTION_FIT", nativeQuery = true)
  public void deleteTmpPredictionFit();

  @Query(value = "\"CALL _SYS_AFL.PAL_AUTOARIMA(TMP_PREDICTION_DATA, PREDICTION_AUTOARIMA_PARAMS, \"\r\n"
      + "        + \"TMP_PREDICTION_MODEL, TMP_PREDICTION_FIT) WITH OVERVIEW\"", nativeQuery = true)
  public void estimateModelParameter();

  @Query("delete from PredictionModelDataEntity modelData where modelData.dish.id=:idDish")
  public void deletePreditionDataModelbyDishId(Long idDish);

  @Query(value = "INSERT INTO PREDICTION_ALL_MODELS SELECT ?1 AS idDish, key, value \" + \"FROM TMP_PREDICTION_MODEL", nativeQuery = true)
  public void addPredictionModel(Long idDish);

  @Query(value = "INSERT INTO TMP_PREDICTION_MODEL SELECT " + "key, value FROM PREDICTION_ALL_MODELS "
      + "WHERE idDish = ?1", nativeQuery = true)
  public void prepareModelPredictions(Long idDish);

}
