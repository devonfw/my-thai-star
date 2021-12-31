package com.devonfw.application.usermanagement.common.to;

import com.devonfw.application.usermanagement.common.ApplicationSearchCriteriaTo;

import lombok.Data;

@Data
public class UserRoleSearchCriteriaTo extends ApplicationSearchCriteriaTo {
  private String name;

  private Boolean active;
}
