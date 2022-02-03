package com.devonfw.application.usermanagement.common.to;

import com.devonfw.application.usermanagement.common.AbstractEto;

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
public class UserRoleEto extends AbstractEto {

  private String name;

  private Boolean active;
}
