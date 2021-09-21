package com.devonfw.app.dishmanagement.common.api;

import java.math.BigDecimal;

public interface Ingredient extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getDescription();

  public void setDescription(String description);

  public BigDecimal getPrice();

  public void setPrice(BigDecimal price);

}
