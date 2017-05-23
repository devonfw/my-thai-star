package io.oasp.application.mtsj.ordermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface OrderLine extends ApplicationEntity {

  public Long getOrderId();

  public void setOrderId(Long orderId);

  public Long getIdDish();

  public void setIdDish(Long idDish);

  public int getAmount();

  public void setAmount(int amount);

  public String getComment();

  public void setComment(String comment);

}
