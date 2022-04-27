package com.devonfw.app.usermanagement.common.api;

public interface UserRole extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public Boolean getActive();

  public void setActive(Boolean active);

}
