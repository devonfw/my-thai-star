package com.devonfw.application.mtsj.usermanagement.logic.api.to;

import java.util.List;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of UserRole
 */
public class UserRoleCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private UserRoleEto userRole;

  private List<UserEto> users;

  public UserRoleEto getUserRole() {

    return this.userRole;
  }

  public void setUserRole(UserRoleEto userRole) {

    this.userRole = userRole;
  }

  public List<UserEto> getUsers() {

    return this.users;
  }

  public void setUsers(List<UserEto> users) {

    this.users = users;
  }

}
