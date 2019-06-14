package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import java.sql.Timestamp;

import com.devonfw.application.mtsj.ordermanagement.common.api.OrderedDishes;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of OrderedDishes
 */
public class OrderedDishesEto extends AbstractEto implements OrderedDishes {

  private static final long serialVersionUID = 1L;

  private Integer amount;

  private Double temperature;

  //Designation of holiday or event
  private String designation;

  private Timestamp bookingdate;

  @Override
  public Integer getAmount() {

    return this.amount;
  }

  @Override
  public void setAmount(Integer amount) {

    this.amount = amount;
  }

  @Override
  public Double getTemperature() {

    return this.temperature;
  }

  @Override
  public void setTemperature(Double temperature) {

    this.temperature = temperature;
  }

  public String getDesignation() {

    return this.designation;
  }

  public void setDesignation(String designation) {

    this.designation = designation;
  }

  @Override
  public Timestamp getBookingdate() {

    return this.bookingdate;
  }

  @Override
  public void setBookingdate(Timestamp bookingdate) {

    this.bookingdate = bookingdate;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();

    result = prime * result + ((this.bookingdate == null) ? 0 : this.bookingdate.hashCode());
    result = prime * result + ((this.amount == null) ? 0 : this.amount.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    // class check will be done by super type EntityTo!
    if (!super.equals(obj)) {
      return false;
    }
    OrderedDishesEto other = (OrderedDishesEto) obj;

    if (this.amount == null) {
      if (other.amount != null) {
        return false;
      }
    } else if (!this.amount.equals(other.amount)) {
      return false;
    }
    if (this.bookingdate == null) {
      if (other.bookingdate != null) {
        return false;
      }
    } else if (!this.bookingdate.equals(other.bookingdate)) {
      return false;
    }

    return true;
  }
}
