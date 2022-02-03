package com.devonfw.application.usermanagement.rest.v1.model;

import com.devonfw.application.usermanagement.general.domain.model.ApplicationSearchCriteriaDto;

import lombok.Data;

@Data
public class UserRoleSearchCriteriaDto extends ApplicationSearchCriteriaDto {
  private String name;

  private Boolean active;
}
