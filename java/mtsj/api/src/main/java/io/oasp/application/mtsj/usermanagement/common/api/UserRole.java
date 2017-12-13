package io.oasp.application.mtsj.usermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface UserRole extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public Boolean getActive();

  public void setActive(Boolean active);

}
