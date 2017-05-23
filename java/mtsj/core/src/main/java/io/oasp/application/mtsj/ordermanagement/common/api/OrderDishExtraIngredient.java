package io.oasp.application.mtsj.ordermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface OrderDishExtraIngredient extends ApplicationEntity {

  public Long getIdOrderLine();

  public void setIdOrderLine(Long idOrderLine);

  public Long getIdIngredient();

  public void setIdIngredient(Long idIngredient);

}
