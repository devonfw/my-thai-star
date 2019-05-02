package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.repo;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionModelDataEntity;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;

/**
 * {@link DefaultRepository} for {@link PredictionModelDataEntity}.
 */
public interface PredictionModelDataRepository extends DefaultRepository<PredictionModelDataEntity> {
  @Query("select count(modelData) from PredictionModelDataEntity modelData where modelData.dish.id=:idDish and modelData.key = '_date' and modelData.value = :startDate ")
  public int isTrainingNecessary(@Param("idDish") Long idDish, @Param("startDate") String startDate);

  @Query("select count(dishEntity) from DishEntity dishEntity")
  public int isTrainingPossible();

  @Modifying
  @Query(value = "DELETE FROM TMP_PREDICTION_DATA", nativeQuery = true)
  public void deleteTmpPredictionData();

  @Modifying
  @Query(value = "INSERT INTO TMP_PREDICTION_DATA SELECT "
      + "TO_INT(ROW_NUMBER() OVER (ORDER BY BOOKINGDATE)) AS timestamp, "
      + "amount AS orders, temperature, CASE WHEN designation IS NULL THEN 0 ELSE 1 END AS holiday "
      + "FROM OrderedDishesPerDay " + "WHERE idDish = ?1 " + "AND BOOKINGDATE < ?2 "
      + "ORDER BY BOOKINGDATE DESC LIMIT 365", nativeQuery = true)
  public void prepareTrainingData(@Param("idDish") Long idDish, @Param("startDate") Timestamp startDate);

  @Modifying
  @Query(value = "DELETE FROM TMP_PREDICTION_MODEL", nativeQuery = true)
  public void deleteTmpPredictionModel();

  @Modifying
  @Query(value = "DELETE FROM TMP_PREDICTION_FIT", nativeQuery = true)
  public void deleteTmpPredictionFit();

  @Modifying
  @Query(value = "delete from PREDICTION_ALL_MODELS modelData where idDish=:idDish", nativeQuery = true)
  public void deletePreditionDataModelbyDishId(@Param("idDish") Long idDish);

  @Query(value = "SELECT MAX(id) FROM PREDICTION_ALL_MODELS", nativeQuery = true)
  public Long getLastIdentityPredictionAllModels();

  @Query(value = "select * from PREDICTION_ALL_MODELS", nativeQuery = true)
  public List<PredictionModelDataEntity> getPredictionAllModels();

  @Modifying
  @Query(value = "INSERT INTO PREDICTION_ALL_MODELS(modificationCounter, IDDISH, key, value) SELECT 1 AS modificationCounter, ?1 AS idDish, key, value FROM TMP_PREDICTION_MODEL", nativeQuery = true)
  public void addPredictionModel(@Param("idDish") Long idDish);

  @Modifying
  @Query(value = "INSERT INTO TMP_PREDICTION_MODEL SELECT key, value FROM PREDICTION_ALL_MODELS WHERE idDish = ?1", nativeQuery = true)
  public void prepareModelPredictions(@Param("idDish") Long idDish);

}
