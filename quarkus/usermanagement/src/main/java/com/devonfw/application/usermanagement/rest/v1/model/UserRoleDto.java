package com.devonfw.application.usermanagement.rest.v1.model;

import com.devonfw.application.usermanagement.general.domain.model.AbstractDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class UserRoleDto extends AbstractDto {

  private String name;

  private Boolean active;
}
