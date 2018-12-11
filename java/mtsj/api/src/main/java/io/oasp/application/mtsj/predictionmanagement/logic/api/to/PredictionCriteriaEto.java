package io.oasp.application.mtsj.predictionmanagement.logic.api.to;

import java.util.List;
import java.sql.Timestamp;
import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionCriteria;

/**
 * Entity transport object of PredictionCriteria
 */
public class PredictionCriteriaEto extends AbstractEto implements PredictionCriteria {

  private static final long serialVersionUID = 1L;

  private Type type;
  private Timestamp startBookingdate;
  private List<Double> temperatures;
  private List<String> holidays;

  @Override
  public Type getType() {

    return this.type;
  }

  @Override
  public void setType(Type type) {

    this.type = type;
  }

  @Override
  public Timestamp getStartBookingdate() {

    return this.startBookingdate;
  }

  @Override
  public void setStartBookingdate(Timestamp startBookingdate) {

    this.startBookingdate = startBookingdate;
  }

  @Override
  public List<Double> getTemperatures() {

    return this.temperatures;
  }

  @Override
  public void setTemperatures(List<Double> temperatures) {

    this.temperatures = temperatures;
  }

  @Override
  public List<String> getHolidays() {

    return this.holidays;
  }

  @Override
  public void setHolidays(List<String> holidays) {

    this.holidays = holidays;
  }

}
