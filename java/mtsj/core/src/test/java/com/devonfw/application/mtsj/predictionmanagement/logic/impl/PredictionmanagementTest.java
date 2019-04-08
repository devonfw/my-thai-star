package com.devonfw.application.mtsj.predictionmanagement.logic.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.context.annotation.Profile;
import org.springframework.security.test.context.support.ReactorContextTestExecutionListener;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;

import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDayDataEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * Test for {@link Predictionmanagement}
 *
 */
// @SpringBootTest(classes = { SpringBootApp.class, PredictionmanagementTest.TestConfig.class })
@Profile("hana")
@TestExecutionListeners(listeners = { WithSecurityContextTestExecutionListener.class,
ReactorContextTestExecutionListener.class })
public class PredictionmanagementTest extends ComponentTest {

  @Inject
  private Predictionmanagement predictionManagement;

  static PredictionDayDataEntity predictionDayData;

  /**
   * Creation of needed objects
   */
  @Override
  public void doSetUp() {

    predictionDayData = new PredictionDayDataEntity();
    predictionDayData.setDishName("Dish 1");
    predictionDayData.setForecast(Double.valueOf(0.8));
    predictionDayData.setId(Long.valueOf(1));
    predictionDayData.setModificationCounter(0);
    predictionDayData.setTimestamp(Integer.valueOf(5));
  }

  /**
   * Tests the prediction
   */
  @Test
  @WithMockUser(username = "manager", authorities = { Roles.MANAGER })
  public void getNextWeekPrediction() {

    List<String> holidays = new ArrayList<>();
    holidays.add("0");

    List<Double> temperatures = new ArrayList<>();
    temperatures.add(Double.valueOf(20.5d));

    PredictionCriteriaEto eto = new PredictionCriteriaEto();
    eto.setHolidays(holidays);
    eto.setTemperatures(temperatures);
    // eto.setType(Type.PREDICTION);
    eto.setStartBookingdate(new Timestamp(System.currentTimeMillis()));
    PredictionDataTo nextWeekPrediction = this.predictionManagement.getNextWeekPrediction(eto);
    assertThat(nextWeekPrediction).isNotNull();
    assertThat(nextWeekPrediction.getData()).isNotNull();
    assertThat(nextWeekPrediction.getData().size()).isEqualTo(1);

    PredictionDayDataEto expected = new PredictionDayDataEto();
    expected.setDishName(predictionDayData.getDishName());
    expected.setForecast(predictionDayData.getForecast());
    expected.setId(predictionDayData.getId());
    expected.setModificationCounter(predictionDayData.getModificationCounter());
    expected.setTimestamp(predictionDayData.getTimestamp());
    assertThat(nextWeekPrediction.getData().get(0)).isEqualToComparingFieldByField(expected);
  }

}
