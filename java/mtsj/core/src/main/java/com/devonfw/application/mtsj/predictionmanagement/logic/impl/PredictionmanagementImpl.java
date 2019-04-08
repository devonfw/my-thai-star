package com.devonfw.application.mtsj.predictionmanagement.logic.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.repo.DishRepository;
import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.application.mtsj.general.logic.base.AbstractComponentFacade;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionDayData;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDayDataEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionModelDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionDayDataRepository;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionForecastDataRepository;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionModelDataRepository;
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
  private PredictionDayDataRepository predictionDayDataRepository;

  @Inject
  private PredictionForecastDataRepository predictionForecastDataRepository;

  @Inject
  private PredictionModelDataRepository predictionModelDataRepository;

  @Inject
  private DishRepository dishRepository;

  /**
   * The constructor.
   */
  public PredictionmanagementImpl() {

    super();
  }

  @Override
  @RolesAllowed(Roles.MANAGER)
  public PredictionDataTo getNextWeekPrediction(PredictionCriteriaEto criteria) {

    LOG.debug("Generate predictions for next week.");

    // delete old forecast data
    this.predictionDayDataRepository.deletePredictionForecastData();

    // add new forecast data
    for (int i = 0; i < criteria.getTemperatures().size(); i++) {
      this.predictionDayDataRepository.addNewForcastData(i + 1,
          criteria.getTemperatures().get(i) == null ? 0 : criteria.getTemperatures().get(i),
          criteria.getHolidays().get(i) == null ? 0 : 1);
    }

    PredictionDataTo predictionDataTo = new PredictionDataTo();
    List<PredictionDayData> predictionDayDataEtos = new ArrayList<>();

    List<DishEntity> dishes = this.dishRepository.findAll();

    for (DishEntity dish : dishes) {
      train(dish, criteria.getStartBookingdate());
    }

    for (DishEntity dish : dishes) {
      generatePredictionFor(dish);
    }

    for (PredictionDayDataEntity entity : this.predictionDayDataRepository.getPrediction(criteria)) {
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

  public void generatePredictionFor(DishEntity dish) {

    // Prepare model parameters
    this.predictionModelDataRepository.deleteTmpPredictionModel();
    this.predictionModelDataRepository.prepareModelPredictions(dish.getId());
    // Do prediction
    this.predictionForecastDataRepository.deleteTmpPredictionForecast();
    this.predictionForecastDataRepository.doPredictions();
    // Save prediction
    this.predictionDayDataRepository.deletePredictionDayDatabyDish(dish.getId());
    this.predictionForecastDataRepository.savePredictions(dish.getId());
  }

  public void train(DishEntity dish, Timestamp startDate) {

    // is training necessary
    boolean alreadyTrained = this.predictionModelDataRepository.isTrainingNecessary(dish.getId(), startDate) > 0;
    if (alreadyTrained) {
      return;
    }
    // is training possible
    boolean existsTrainingData = this.predictionModelDataRepository.isTrainingPossible() > 0;
    if (!existsTrainingData) {
      return;
    }
    // prepare training data
    this.predictionModelDataRepository.deleteTmpPredictionData();
    this.predictionModelDataRepository.prepareTrainingData(dish.getId(), startDate);

    // Estimate model parameters
    this.predictionModelDataRepository.deleteTmpPredictionModel();
    this.predictionModelDataRepository.deleteTmpPredictionFit();
    this.predictionModelDataRepository.estimateModelParameter();

    // Save model
    this.predictionModelDataRepository.deletePreditionDataModelbyDishId(dish.getId());
    this.predictionModelDataRepository.addPredictionModel(dish.getId());
    PredictionModelDataEntity entity = new PredictionModelDataEntity();
    entity.setDish(dish);
    entity.setKey("_date");
    entity.setValue(startDate.toString());
    this.predictionModelDataRepository.save(entity);

  }

}
