package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * temp entity
 *
 */
@Entity
@Table(name = "Ingredient")
public class Ingredient extends ApplicationPersistenceEntity {

  private static final long serialVersionUID = 1L;

  private String name;

  private String description;

  private BigDecimal price;

  /**
   * @return name
   */
  public String getName() {

    return this.name;
  }

  /**
   * @param name new value of {@link #getname}.
   */
  public void setName(String name) {

    this.name = name;
  }

  /**
   * @return description
   */
  public String getDescription() {

    return this.description;
  }

  /**
   * @param description new value of {@link #getdescription}.
   */
  public void setDescription(String description) {

    this.description = description;
  }

  /**
   * @return price
   */
  public BigDecimal getPrice() {

    return this.price;
  }

  /**
   * @param price new value of {@link #getprice}.
   */
  public void setPrice(BigDecimal price) {

    this.price = price;
  }

  /**
   * @return serialversionuid
   */
  public static long getSerialversionuid() {

    return serialVersionUID;
  }

}
