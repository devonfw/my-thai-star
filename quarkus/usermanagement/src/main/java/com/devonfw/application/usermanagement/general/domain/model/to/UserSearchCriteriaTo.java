package com.devonfw.application.usermanagement.common.to;

import com.devonfw.application.usermanagement.common.ApplicationSearchCriteriaTo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchCriteriaTo extends ApplicationSearchCriteriaTo {
  private String username;

  private String email;

  private Long userRoleId;
}
