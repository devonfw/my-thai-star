package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.ordermanagement.common.api.OrderState;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of OrderState
 */
public class OrderStateEto extends AbstractEto implements OrderState {

  private static final long serialVersionUID = 1L;

  private String stateName;

  @Override
  public String getStateName() {

    return stateName;
  }

  @Override
  public void setStateName(String stateName) {

    this.stateName = stateName;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.stateName == null) ? 0 : this.stateName.hashCode());
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
    OrderStateEto other = (OrderStateEto) obj;
    if (this.stateName == null) {
      if (other.stateName != null) {
        return false;
      }
    } else if (!this.stateName.equals(other.stateName)) {
      return false;
    }
    return true;
  }
}
