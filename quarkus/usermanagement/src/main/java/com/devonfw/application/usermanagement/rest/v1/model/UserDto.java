package com.devonfw.application.usermanagement.rest.v1.model;

import java.util.Set;

import com.devonfw.application.usermanagement.general.domain.model.AbstractDto;

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
public class UserDto extends AbstractDto {
  private String username;

  private String email;

  private Boolean twoFactorStatus;

  private Long userRoleId;

  private Set<UserFavouriteDto> userFavourites;
}
