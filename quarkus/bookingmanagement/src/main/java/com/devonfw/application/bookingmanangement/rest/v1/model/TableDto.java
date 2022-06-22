package com.devonfw.application.bookingmanangement.rest.v1.model;

import com.devonfw.application.bookingmanangement.general.domain.model.AbstractDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TableDto extends AbstractDto {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

}
