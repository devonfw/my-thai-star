package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.predictionmanagement.common.api.PredictionCriteria.Type;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;
import java.sql.Timestamp;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * This is the {@link SearchCriteriaTo search criteria}
 * {@link net.sf.mmm.util.transferobject.api.TransferObject TO} used to find
 * {@link io.oasp.application.mtsj.ordermanagement.common.api.OrderedDishes}.
 *
 */
public class OrderedDishesSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  public static enum Type {
    DAILY, MONTHLY;

    @JsonCreator
    public static Type fromValue(String value) {

      if (Type.DAILY.name().equalsIgnoreCase(value)) {
        return Type.DAILY;
      } else if (Type.MONTHLY.name().equalsIgnoreCase(value)) {
        return Type.MONTHLY;
      }

      throw new IllegalArgumentException("No enum constant " + Type.class.getName() + "." + value);
    }

    @JsonValue
    public String toValue() {

      return this.name().toLowerCase();
    }
  }

  private Type type;

  private Timestamp startBookingdate;

  private Timestamp endBookingdate;

  /**
   * The constructor.
   */
  public OrderedDishesSearchCriteriaTo() {

    super();
  }

  public Type getType() {

    return this.type;
  }

  public void setType(Type type) {

    this.type = type;
  }

  public Timestamp getStartBookingdate() {

    return this.startBookingdate;
  }

  public Timestamp getStartBookingdateTimestamp() {

    return new Timestamp(getStartBookingdate().getYear(), getStartBookingdate().getMonth(),
        getStartBookingdate().getDate() - 1, 23, 59, 59, 999);
  }

  public void setStartBookingdate(Timestamp startBookingdate) {

    this.startBookingdate = startBookingdate;
  }

  public Timestamp getEndBookingdate() {

    return this.endBookingdate;
  }

  public Timestamp getEndBookingdateTimestamp() {

    return new Timestamp(getEndBookingdate().getYear(), getEndBookingdate().getMonth(), getEndBookingdate().getDate(),
        23, 59, 59, 999);
  }

  public void setEndBookingdate(Timestamp endBookingdate) {

    this.endBookingdate = endBookingdate;
  }

}
