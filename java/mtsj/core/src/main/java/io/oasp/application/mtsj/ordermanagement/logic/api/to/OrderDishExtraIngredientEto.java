package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.ordermanagement.common.api.OrderDishExtraIngredient;

/**
 * Entity transport object of OrderDishExtraIngredient
 */
public class OrderDishExtraIngredientEto extends AbstractEto implements OrderDishExtraIngredient {

  private static final long serialVersionUID = 1L;

  private Long idOrderLine;

  private Long idIngredient;

  @Override
  public Long getIdOrderLine() {

    return idOrderLine;
  }

  @Override
  public void setIdOrderLine(Long idOrderLine) {

    this.idOrderLine = idOrderLine;
  }

  @Override
  public Long getIdIngredient() {

    return idIngredient;
  }

  @Override
  public void setIdIngredient(Long idIngredient) {

    this.idIngredient = idIngredient;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.idOrderLine == null) ? 0 : this.idOrderLine.hashCode());
    result = prime * result + ((this.idIngredient == null) ? 0 : this.idIngredient.hashCode());
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
    OrderDishExtraIngredientEto other = (OrderDishExtraIngredientEto) obj;
    if (this.idOrderLine == null) {
      if (other.idOrderLine != null) {
        return false;
      }
    } else if (!this.idOrderLine.equals(other.idOrderLine)) {
      return false;
    }
    if (this.idIngredient == null) {
      if (other.idIngredient != null) {
        return false;
      }
    } else if (!this.idIngredient.equals(other.idIngredient)) {
      return false;
    }
    return true;
  }
}
