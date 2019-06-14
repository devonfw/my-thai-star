package com.devonfw.application.mtsj.predictionmanagement.common.api.to;

import java.sql.Timestamp;
import java.util.List;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 *
 *
 * used to find {@link com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionForecastData}s.
 */
public class PredictionSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Type type;

  private Timestamp startBookingdate;

  private List<Double> temperatures;

  private List<String> holidays;

  private StringSearchConfigTo typeOption;

  private StringSearchConfigTo startBookingdateOption;

  private StringSearchConfigTo temperaturesOption;

  private StringSearchConfigTo holidaysOption;

  /**
   * @return typeOption
   */
  public StringSearchConfigTo getTypeOption() {

    return this.typeOption;
  }

  /**
   * @param typeOption new value of {@link #getTypeOption}.
   */
  public void setTypeOption(StringSearchConfigTo typeOption) {

    this.typeOption = typeOption;
  }

  /**
   * @return startBookingdateOption
   */
  public StringSearchConfigTo getStartBookingdateOption() {

    return this.startBookingdateOption;
  }

  /**
   * @param startBookingdateOption new value of {@link #getStartBookingdateOption}.
   */
  public void setStartBookingdateOption(StringSearchConfigTo startBookingdateOption) {

    this.startBookingdateOption = startBookingdateOption;
  }

  /**
   * @return temperaturesOption
   */
  public StringSearchConfigTo getTemperaturesOption() {

    return this.temperaturesOption;
  }

  /**
   * @param temperaturesOption new value of {@link #getTemperaturesOption}.
   */
  public void setTemperaturesOption(StringSearchConfigTo temperaturesOption) {

    this.temperaturesOption = temperaturesOption;
  }

  /**
   * @return holidaysOption
   */
  public StringSearchConfigTo getHolidaysOption() {

    return this.holidaysOption;
  }

  /**
   * @param holidaysOption new value of {@link #getHolidaysOption}.
   */
  public void setHolidaysOption(StringSearchConfigTo holidaysOption) {

    this.holidaysOption = holidaysOption;
  }

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
