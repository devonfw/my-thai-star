package com.devonfw.application.mtsj.predictionmanagement.common.api.to;

import java.sql.Timestamp;
import java.util.List;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Entity transport object of PredictionCriteria
 */
public class PredictionCriteriaEto extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Type type;

  private Timestamp startBookingdate;

  private List<Double> temperatures;

  private List<String> holidays;

  // @Override
  public Type getType() {

    return this.type;
  }

  // @Override
  public void setType(Type type) {

    this.type = type;
  }

  // @Override
  public Timestamp getStartBookingdate() {

    return this.startBookingdate;
  }

  // @Override
  public void setStartBookingdate(Timestamp startBookingdate) {

    this.startBookingdate = startBookingdate;
  }

  // @Override
  public List<Double> getTemperatures() {

    return this.temperatures;
  }

  // @Override
  public void setTemperatures(List<Double> temperatures) {

    this.temperatures = temperatures;
  }

  // @Override
  public List<String> getHolidays() {

    return this.holidays;
  }

  // @Override
  public void setHolidays(List<String> holidays) {

    this.holidays = holidays;
  }

  public enum Type {
    PREDICTION;

    @JsonCreator
    public static Type fromValue(String value) {

      if (Type.PREDICTION.name().equalsIgnoreCase(value)) {
        return Type.PREDICTION;
      }

      throw new IllegalArgumentException("No enum constant " + Type.class.getName() + "." + value);
    }

    @JsonValue
    public String toValue() {

      return name().toLowerCase();
    }
  }

}
