package io.oasp.application.mtsj.usermanagement.logic.api.to;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.usermanagement.common.api.User}s.
 *
 */
public class UserSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String username;

  private String password;

  private String email;

  private Long userRoleId;

  /**
   * The constructor.
   */
  public UserSearchCriteriaTo() {

    super();
  }

  public String getUsername() {

    return username;
  }

  public void setUsername(String username) {

    this.username = username;
  }

  public String getPassword() {

    return password;
  }

  public void setPassword(String password) {

    this.password = password;
  }

  public String getEmail() {

    return email;
  }

  public void setEmail(String email) {

    this.email = email;
  }

  public Long getUserRoleId() {

    return userRoleId;
  }

  public void setUserRoleId(Long userRoleId) {

    this.userRoleId = userRoleId;
  }

}
