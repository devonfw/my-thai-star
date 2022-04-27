package com.devonfw.application.usermanagement.rest.v1.model;

import com.devonfw.application.usermanagement.general.domain.model.AbstractDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFavouriteDto extends AbstractDto {
  private Long idUser;

  private Long idDish;
}
