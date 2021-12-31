package com.devonfw.application.usermanagement.common.to;

import com.devonfw.application.usermanagement.common.AbstractEto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEto extends AbstractEto {
  private String username;

  private String email;

  private boolean twoFactorStatus;

  private Long userRoleId;
}
