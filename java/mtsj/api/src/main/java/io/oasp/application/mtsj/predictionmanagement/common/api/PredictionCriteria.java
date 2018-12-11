package io.oasp.application.mtsj.predictionmanagement.common.api;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.sql.Timestamp;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface PredictionCriteria extends ApplicationEntity {

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

      return this.name().toLowerCase();
    }
  }

  /**
   * @return the type of the prediction (the only valid value is 'prediction')
   */
  public Type getType();

  /**
   * Set the type of the prediction (the only valid value is 'prediction')
   * 
   * @param type
   *          the type of the prediction (the only valid value is 'prediction')
   */
  public void setType(Type type);

  /**
   * @return the earliest date to use for the prediction
   */
  public Timestamp getStartBookingdate();

  /**
   * Set the earliest date to use for the prediction
   * 
   * @param startBookingdate
   *          the earliest date to use for the prediction
   */
  public void setStartBookingdate(Timestamp startBookingdate);

  /**
   * @return the list of temperatures used for the prediction
   */
  public List<Double> getTemperatures();

  /**
   * Set the list of temperatures used for the prediction
   * 
   * @param temperatures
   *          the list of temperatures used for the prediction
   */
  public void setTemperatures(List<Double> temperatures);

  /**
   * @return the list of holidays used for the prediction
   */
  public List<String> getHolidays();

  /**
   * Set the list of holidays used for the prediction
   * 
   * @param holidays
   *          the list of holidays used for the prediction
   */
  public void setHolidays(List<String> holidays);

}
