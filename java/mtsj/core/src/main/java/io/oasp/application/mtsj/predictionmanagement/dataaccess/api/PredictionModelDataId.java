package io.oasp.application.mtsj.predictionmanagement.dataaccess.api;

import java.io.Serializable;

public class PredictionModelDataId implements Serializable {

  private static final long serialVersionUID = 1L;

  private Long dish;
  private String key;

  public Long getDish() {

    return this.dish;
  }

  public void setDish(Long dish) {

    this.dish = dish;
  }

  public String getKey() {

    return this.key;
  }

  public void setKey(String key) {

    this.key = key;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = 1;
    result = prime * result + ((this.dish == null) ? 0 : this.dish.hashCode());
    result = prime * result + ((this.key == null) ? 0 : this.key.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    PredictionModelDataId other = (PredictionModelDataId) obj;
    if (this.dish == null) {
      if (other.dish != null)
        return false;
    } else if (!this.dish.equals(other.dish))
      return false;
    if (this.key == null) {
      if (other.key != null)
        return false;
    } else if (!this.key.equals(other.key))
      return false;
    return true;
  }

}
