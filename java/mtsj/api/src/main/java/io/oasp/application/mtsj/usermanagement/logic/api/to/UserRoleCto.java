package io.oasp.application.mtsj.usermanagement.logic.api.to;

import java.util.List;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of UserRole
 */
public class UserRoleCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private UserRoleEto userRole;

  private List<UserEto> users;

  public UserRoleEto getUserRole() {

    return userRole;
  }

  public void setUserRole(UserRoleEto userRole) {

    this.userRole = userRole;
  }

  public List<UserEto> getUsers() {

    return users;
  }

  public void setUsers(List<UserEto> users) {

    this.users = users;
  }

}
