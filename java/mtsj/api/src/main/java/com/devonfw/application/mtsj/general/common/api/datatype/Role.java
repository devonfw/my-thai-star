package com.devonfw.application.mtsj.general.common.api.datatype;

import java.security.Principal;

public enum Role implements Principal {

  MANAGER(2L, "Manager"), WAITER(1L, "Waiter"), CUSTOMER(0L, "Customer");

  private final Long id;

  private final String name;

  private Role(Long id, String name) {

    this.id = id;
    this.name = name;
  }

  @Override
  public String getName() {

    return "ROLE_" + this.name;
  }

  public String getRole() {

    return this.name;
  }

  public static Role getRoleById(Long id) {

    for (Role role : values()) {
      if (role.id.equals(id)) {
        return role;
      }
    }
    return Role.CUSTOMER;
  }
}
