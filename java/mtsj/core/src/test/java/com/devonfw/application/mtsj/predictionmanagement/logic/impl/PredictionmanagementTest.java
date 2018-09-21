package com.devonfw.application.mtsj.predictionmanagement.logic.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.security.test.context.support.ReactorContextTestExecutionListener;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionCriteria.Type;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionCriteriaEto;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDataTo;
import com.devonfw.application.mtsj.predictionmanagement.common.api.to.PredictionDayDataEto;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.PredictionDayDataEntity;
import com.devonfw.application.mtsj.predictionmanagement.dataaccess.api.dao.PredictionDayDataDao;
import com.devonfw.application.mtsj.predictionmanagement.logic.api.Predictionmanagement;
import com.devonfw.module.basic.common.api.reference.Ref;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * Test for {@link Predictionmanagement}
 *
 */
@SpringBootTest(classes = { SpringBootApp.class, PredictionmanagementTest.TestConfig.class })
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
    eto.setType(Type.PREDICTION);
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

  @SpringBootConfiguration
  public static class TestConfig {
    @Bean
    @Primary
    public PredictionDayDataDao predictionDayDataDao() {

      return new PredictionDayDataDao() {

        @Override
        public void forceIncrementModificationCounter(PredictionDayDataEntity entity) {

          throw new UnsupportedOperationException("forceIncrementModificationCounter");
        }

        @Override
        public void save(Iterable<? extends PredictionDayDataEntity> entities) {

          throw new UnsupportedOperationException("save");
        }

        @Override
        public PredictionDayDataEntity save(PredictionDayDataEntity entity) {

          throw new UnsupportedOperationException("save");
        }

        @Override
        public PredictionDayDataEntity get(Ref<Long, PredictionDayDataEntity> reference) {

          throw new UnsupportedOperationException("get");
        }

        @Override
        public PredictionDayDataEntity findOne(Long id) throws IllegalArgumentException {

          throw new UnsupportedOperationException("findOne");
        }

        @Override
        public List<PredictionDayDataEntity> findAll(Iterable<Long> ids) {

          throw new UnsupportedOperationException("findAll");
        }

        @Override
        public PredictionDayDataEntity find(Long id) {

          throw new UnsupportedOperationException("find");
        }

        @Override
        public boolean exists(Long id) {

          throw new UnsupportedOperationException("exists");
        }

        @Override
        public void delete(Iterable<? extends PredictionDayDataEntity> entities) {

          throw new UnsupportedOperationException("delete");
        }

        @Override
        public void delete(PredictionDayDataEntity entity) {

          throw new UnsupportedOperationException("delete");
        }

        @Override
        public void delete(Long id) throws IllegalArgumentException {

          throw new UnsupportedOperationException("delete");
        }

        @Override
        public List<PredictionDayDataEntity> getPrediction(PredictionCriteriaEto criteria) {

          List<PredictionDayDataEntity> prediction = new ArrayList<>();
          prediction.add(PredictionmanagementTest.predictionDayData);
          return prediction;
        }
      };
    }

  }

}
