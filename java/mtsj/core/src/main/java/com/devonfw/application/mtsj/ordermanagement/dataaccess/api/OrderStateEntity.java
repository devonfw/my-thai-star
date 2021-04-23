package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.OrderState;

/**
 * The {@link com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link OrderState}.
 */
@Entity
@Table(name = "OrderState")
public class OrderStateEntity extends ApplicationPersistenceEntity implements OrderState {
  private String stateName;

  /**
   * @return stateName
   */
  @Override
  public String getStateName() {

    return this.stateName;
  }

  /**
   * @return stateName
   */
  public void setStateName(String stateName) {

    this.stateName = stateName;
  }
}
