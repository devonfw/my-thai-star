package com.devonfw.application.usermanagement.common.to;

import com.devonfw.application.usermanagement.common.ApplicationSearchCriteriaTo;

import lombok.Data;

@Data
public class UserSearchCriteriaTo extends ApplicationSearchCriteriaTo {
  private String username;

  private String password;

  private String email;

  private String secret;

  private boolean twoFactorStatus;

  private Long userRoleId;
}
