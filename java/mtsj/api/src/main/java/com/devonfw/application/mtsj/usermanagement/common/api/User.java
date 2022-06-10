package com.devonfw.application.mtsj.usermanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface User extends ApplicationEntity {

  public String getUsername();

  public void setUsername(String username);

  public String getEmail();

  public void setEmail(String email);

  public Long getUserRoleId();

  public void setUserRoleId(Long userRoleId);

  public boolean getTwoFactorStatus();

  public void setTwoFactorStatus(boolean twoFactorStatus);

  public String getPassword();

  public void setPassword(String password);
}
