package io.oasp.application.mtsj.ordermanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.ordermanagement.common.api.OrderLine;

/**
 * Entity transport object of OrderLine
 */
public class OrderLineEto extends AbstractEto implements OrderLine {

  private static final long serialVersionUID = 1L;

  private Long orderId;

  private Long idDish;

  private int amount;

  private String comment;

  @Override
  public Long getOrderId() {

    return orderId;
  }

  @Override
  public void setOrderId(Long orderId) {

    this.orderId = orderId;
  }

  @Override
  public Long getIdDish() {

    return idDish;
  }

  @Override
  public void setIdDish(Long idDish) {

    this.idDish = idDish;
  }

  @Override
  public int getAmount() {

    return amount;
  }

  @Override
  public void setAmount(int amount) {

    this.amount = amount;
  }

  @Override
  public String getComment() {

    return comment;
  }

  @Override
  public void setComment(String comment) {

    this.comment = comment;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();

    result = prime * result + ((this.orderId == null) ? 0 : this.orderId.hashCode());
    result = prime * result + ((this.idDish == null) ? 0 : this.idDish.hashCode());

    result = prime * result + ((Integer) amount).hashCode();
    result = prime * result + ((this.comment == null) ? 0 : this.comment.hashCode());
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
    OrderLineEto other = (OrderLineEto) obj;

    if (this.orderId == null) {
      if (other.orderId != null) {
        return false;
      }
    } else if (!this.orderId.equals(other.orderId)) {
      return false;
    }
    if (this.idDish == null) {
      if (other.idDish != null) {
        return false;
      }
    } else if (!this.idDish.equals(other.idDish)) {
      return false;
    }

    if (this.amount != other.amount) {
      return false;
    }
    if (this.comment == null) {
      if (other.comment != null) {
        return false;
      }
    } else if (!this.comment.equals(other.comment)) {
      return false;
    }
    return true;
  }
}
