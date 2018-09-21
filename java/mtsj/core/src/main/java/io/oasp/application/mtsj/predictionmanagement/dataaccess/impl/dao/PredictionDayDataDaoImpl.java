package io.oasp.application.mtsj.predictionmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaDelete;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.PredictionForecastDataEntity;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.PredictionModelDataEntity;
import io.oasp.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionDayDataDao;
import io.oasp.application.mtsj.predictionmanagement.logic.api.to.PredictionCriteriaEto;

/**
 * This is the implementation of {@link PredictionDayDataDao}.
 */
@Named
public class PredictionDayDataDaoImpl extends ApplicationDaoImpl<PredictionDayDataEntity> implements PredictionDayDataDao {

  @Inject
  private DishDao dishDao;

  /**
   * The constructor.
   */
  public PredictionDayDataDaoImpl() {

    super();
  }

  public DishDao getDishDao() {

    return this.dishDao;
  }

  @Override
  public Class<PredictionDayDataEntity> getEntityClass() {

    return PredictionDayDataEntity.class;
  }

  public void train(DishEntity dish, Timestamp startDate) {

    // Check if training is necessary

    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
    Root<PredictionModelDataEntity> countQueryRoot = countQuery.from(PredictionModelDataEntity.class);
    countQuery.select(cb.count(countQueryRoot));
    countQuery.where(
        cb.and(
            cb.equal(countQueryRoot.get("dish").get("id"), dish.getId()),
            cb.equal(countQueryRoot.get("key"), "_date"),
            cb.equal(countQueryRoot.get("value"), startDate.toString())
        )
    );
    boolean alreadyTrained = getEntityManager().createQuery(countQuery).getSingleResult().longValue() > 0;

    if (alreadyTrained) {
    	return;
    }

    // Prepare training data

    getEntityManager().createNativeQuery("DELETE FROM TMP_PREDICTION_DATA").executeUpdate();
    getEntityManager().createNativeQuery(
      "INSERT INTO TMP_PREDICTION_DATA SELECT "
      + "TO_INT(ROW_NUMBER() OVER (ORDER BY BOOKINGDATE)) AS timestamp, "
      + "amount AS orders, temperature, CASE WHEN designation IS NULL THEN 0 ELSE 1 END AS holiday "
      + "FROM OrderedDishesPerDay "
      + "WHERE idDish = ?1 "
      + "AND BOOKINGDATE < ?2 "
      + "ORDER BY BOOKINGDATE DESC LIMIT 365"
    )
    .setParameter(1, dish.getId())
    .setParameter(2, startDate)
    .executeUpdate();

    // Estimate model parameters

    getEntityManager().createNativeQuery("DELETE FROM TMP_PREDICTION_MODEL").executeUpdate();
    getEntityManager().createNativeQuery("DELETE FROM TMP_PREDICTION_FIT").executeUpdate();
    getEntityManager().createNativeQuery(
      "CALL _SYS_AFL.PAL_AUTOARIMA(TMP_PREDICTION_DATA, PREDICTION_AUTOARIMA_PARAMS, "
      + "TMP_PREDICTION_MODEL, TMP_PREDICTION_FIT) WITH OVERVIEW"
    ).executeUpdate();

    // Save model

    CriteriaDelete<PredictionModelDataEntity> criteriaDelete = cb.createCriteriaDelete(PredictionModelDataEntity.class);
    Root<PredictionModelDataEntity> criteriaDeleteRoot = criteriaDelete.from(PredictionModelDataEntity.class);
    criteriaDelete.where(cb.equal(criteriaDeleteRoot.get("dish").get("id"), dish.getId()));
    getEntityManager().createQuery(criteriaDelete).executeUpdate();

    getEntityManager().createNativeQuery(
      "INSERT INTO PREDICTION_ALL_MODELS SELECT ?1 AS idDish, key, value "
      + "FROM TMP_PREDICTION_MODEL"
    )
    .setParameter(1, dish.getId())
    .executeUpdate();

    PredictionModelDataEntity entity = new PredictionModelDataEntity();
    entity.setDish(dish);
    entity.setKey("_date");
    entity.setValue(startDate.toString());
    getEntityManager().persist(entity);
  }

  public void generatePredictionFor(DishEntity dish) {

    // Prepare model parameters

    getEntityManager().createNativeQuery("DELETE FROM TMP_PREDICTION_MODEL").executeUpdate();
    getEntityManager().createNativeQuery(
      "INSERT INTO TMP_PREDICTION_MODEL SELECT "
      + "key, value FROM PREDICTION_ALL_MODELS "
      + "WHERE idDish = ?1"
    )
    .setParameter(1, dish.getId())
    .executeUpdate();

    // Do prediction

    getEntityManager().createNativeQuery("DELETE FROM TMP_PREDICTION_FORECAST").executeUpdate();
    getEntityManager().createNativeQuery(
      "CALL _SYS_AFL.PAL_ARIMA_FORECAST(PREDICTION_FORECAST_DATA, TMP_PREDICTION_MODEL, "
      + "PREDICTION_ARIMA_PARAMS, TMP_PREDICTION_FORECAST) WITH OVERVIEW"
    ).executeUpdate();

    // Save prediction

    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaDelete<PredictionDayDataEntity> criteriaDelete = cb.createCriteriaDelete(PredictionDayDataEntity.class);
    Root<PredictionDayDataEntity> from = criteriaDelete.from(PredictionDayDataEntity.class);
    criteriaDelete.where(cb.equal(from.get("dish").get("id"), dish.getId()));
    getEntityManager().createQuery(criteriaDelete).executeUpdate();

    getEntityManager().createNativeQuery(
      "INSERT INTO PREDICTION_ALL_FORECAST (idDish, dishName, timestamp, forecast) "
      + "SELECT ?1 AS idDish, Dish.name AS dishName, timestamp, forecast "
      + "FROM TMP_PREDICTION_FORECAST LEFT JOIN Dish ON Dish.id = ?1"
    )
    .setParameter(1, dish.getId())
    .executeUpdate();
  }

  @Override
  public List<PredictionDayDataEntity> getPrediction(PredictionCriteriaEto criteria) {

    List<DishEntity> dishes = getDishDao().findDishs(new DishSearchCriteriaTo()).getResult();

    // delete old forecast data
    CriteriaBuilder cb = getEntityManager().getCriteriaBuilder();
    CriteriaDelete<PredictionForecastDataEntity> criteriaDelete = cb.createCriteriaDelete(PredictionForecastDataEntity.class);
    criteriaDelete.from(PredictionForecastDataEntity.class);
    getEntityManager().createQuery(criteriaDelete).executeUpdate();

    // add new forecast data
    for (int i = 0; i < criteria.getTemperatures().size(); i++) {
      PredictionForecastDataEntity forecastData = new PredictionForecastDataEntity();
      forecastData.setTimestamp(i+1);
      forecastData.setTemperature(criteria.getTemperatures().get(i) == null ? 0 : criteria.getTemperatures().get(i));
      forecastData.setHoliday(criteria.getHolidays().get(i) == null ? 0 : 1);
      getEntityManager().persist(forecastData);
    }

    // Training

    for (DishEntity dish : dishes) {
      train(dish, criteria.getStartBookingdate());
    }

    // Prediction

    for (DishEntity dish : dishes) {
      generatePredictionFor(dish);
    }

    PredictionDayDataEntity predictionDayData = Alias.alias(PredictionDayDataEntity.class);
    EntityPathBase<PredictionDayDataEntity> alias = Alias.$(predictionDayData);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    return query.list(alias);
  }

}
