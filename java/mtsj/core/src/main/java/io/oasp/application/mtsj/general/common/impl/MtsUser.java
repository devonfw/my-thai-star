package io.oasp.application.mtsj.general.common.impl;

import io.oasp.application.mtsj.general.common.api.UserProfile;
import io.oasp.application.mtsj.general.common.api.datatype.Role;

/**
 * @author pparrado
 *
 */
public class MtsUser implements UserProfile {

  private String username;

  private String password;

  private String email;

  private Long userRoleId;

  public String getUsername() {

    return this.username;
  }

  public void setUsername(String username) {

    this.username = username;
  }

  public String getPassword() {

    return this.password;
  }

  public void setPassword(String password) {

    this.password = password;
  }

  public String getEmail() {

    return this.email;
  }

  public void setEmail(String email) {

    this.email = email;
  }

  public Long getUserRoleId() {

    return this.userRoleId;
  }

  public void setUserRoleId(Long userRoleId) {

    this.userRoleId = userRoleId;
  }

  @Override
  public Long getId() {

    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getName() {

    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getFirstName() {

    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public String getLastName() {

    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public Role getRole() {

    // TODO Auto-generated method stub
    return null;
  }

}
