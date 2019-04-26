package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Immutable;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.OrderedDishes;

/**
 * {@link ApplicationPersistenceEntity Entity} that represents a single {@link OrderedDishesPerDay} of an
 * {@link OrderedDishesPerDay}.
 */
@Entity
@Immutable
@Table(name = "OrderedDishesPerDay")
public class OrderedDishesPerDayEntity extends ApplicationPersistenceEntity implements OrderedDishes {

  private static final long serialVersionUID = 1L;

  private DishEntity dish;

  private Integer amount;

  private Double temperature;

  private String designation;

  private Timestamp bookingdate;

  /**
   * @return dish
   */
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idDish")
  public DishEntity getDish() {

    return this.dish;
  }

  /**
   * @param dish new value of {@link #getDish}.
   */
  public void setDish(DishEntity dish) {

    this.dish = dish;
  }

  /**
   * @return amount
   */
  @Override
  public Integer getAmount() {

    return this.amount;
  }

  /**
   * @param number of ordered dished per day {@link #getAmount}.
   */
  @Override
  public void setAmount(Integer amount) {

    this.amount = amount;
  }

  /**
   * @return temperature
   */
  @Override
  public Double getTemperature() {

    return this.temperature;
  }

  /**
   * @param temperature new value of {@link #getTemperature}.
   */
  @Override
  public void setTemperature(Double temperature) {

    this.temperature = temperature;
  }

  /**
   * @return designation
   */
  public String getDesignation() {

    return this.designation;
  }

  /**
   * @param designation of holiday or event {@link #getDesignation}.
   */
  public void setDesignation(String designation) {

    this.designation = designation;
  }

  /**
   * @return bookingdate
   */
  @Override
  public Timestamp getBookingdate() {

    return this.bookingdate;
  }

  /**
   * @param bookingdate new value of {@link #getBookingdate}.
   */
  @Override
  public void setBookingdate(Timestamp bookingdate) {

    this.bookingdate = bookingdate;
  }
}
