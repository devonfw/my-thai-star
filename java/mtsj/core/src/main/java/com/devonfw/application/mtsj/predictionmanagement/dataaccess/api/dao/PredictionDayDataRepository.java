package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * Data access interface for PredictionDayData entities
 */
public interface PredictionDayDataRepository extends DefaultRepository<PredictionDayDataEntity> {

  // delete old forecast data
  @Query("delete from PredictionForecastDataEntity")
  void deletePredictionForecastData();

  // add new forecast data
  @Query("insert into PredictionForecastDataEntity (timestamp,temperature,holiday) select :timestamp,:temperature,:holiday")
  public void addNewForcastData(@Param("timestamp") int timestamp, @Param("temperature") double temperature,
      @Param("holiday") int holiday);

  @Query("delete from PredictionDayDataEntity dayData where dayData.dish.id=:idDish")
  public void deletePredictionDayDatabyDish(Long idDish);

  default Page<PredictionDayDataEntity> getPrediction(PredictionCriteriaEto criteria) {

    PredictionDayDataEntity alias = newDslAlias();
    JPAQuery<PredictionDayDataEntity> query = newDslQuery(alias);
    /*
     * Timestamp startBookingDate = criteria.getStartBookingdate(); if (startBookingDate != null) {
     * query.where(Alias.$(alias.getTimestamp()).eq(startBookingDate)); }
     */
    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }

}
