package io.oasp.application.mtsj.ordermanagement.common.api;

import java.util.List;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.Ingredient;

public interface OrderLine extends ApplicationEntity {

  public Long getOrderId();

  public void setOrderId(Long orderId);

  public Long getIdPlate();

  public void setIdPlate(Long idDish);

  public List<Ingredient> getExtras();

  public void setExtras(List<Ingredient> extras);

  public int getAmount();

  public void setAmount(int amount);

  public String getComment();

  public void setComment(String comment);

}
