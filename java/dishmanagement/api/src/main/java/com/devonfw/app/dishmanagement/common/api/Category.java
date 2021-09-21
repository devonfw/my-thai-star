package com.devonfw.app.dishmanagement.common.api;

public interface Category extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getDescription();

  public void setDescription(String description);

  public int getShowOrder();

  public void setShowOrder(int showOrder);

}
