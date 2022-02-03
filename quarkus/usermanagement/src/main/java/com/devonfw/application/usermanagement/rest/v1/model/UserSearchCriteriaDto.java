package com.devonfw.application.usermanagement.rest.v1.model;

import com.devonfw.application.usermanagement.general.domain.model.ApplicationSearchCriteriaDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserSearchCriteriaDto extends ApplicationSearchCriteriaDto {
  private String username;

  private String email;

  private Long userRoleId;
}
