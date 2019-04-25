package com.devonfw.application.mtsj.predictionmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.predictionmanagement.common.api.PredictionModelData;

@Entity
@Table(name = "PREDICTION_ALL_MODELS")
public class PredictionModelDataEntity extends ApplicationPersistenceEntity implements PredictionModelData {

  private static final long serialVersionUID = 1L;

  private DishEntity dish;

  private String key;

  private String value;

  // @Id
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "IDDISH")
  public DishEntity getDish() {

    return this.dish;
  }

  public void setDish(DishEntity dish) {

    this.dish = dish;
  }

  @Transient
  public Long getDishId() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getId();
  }

  // @Id
  public String getKey() {

    return this.key;
  }

  public void setKey(String key) {

    this.key = key;
  }

  public String getValue() {

    return this.value;
  }

  public void setValue(String value) {

    this.value = value;
  }

}
