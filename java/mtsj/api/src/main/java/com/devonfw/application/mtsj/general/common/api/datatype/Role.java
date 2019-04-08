package com.devonfw.application.mtsj.general.common.api.datatype;

import java.security.Principal;

public enum Role implements Principal {

  MANAGER("Manager"),
  WAITER("Waiter"),
  CUSTOMER("Customer");

  private final String name;

  private Role(String name) {
    this.name = name;
  }

  @Override
  public String getName() {
    return "ROLE_" + this.name;
  }
}
