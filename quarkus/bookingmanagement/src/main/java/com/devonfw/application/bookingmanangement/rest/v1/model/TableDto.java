package com.devonfw.application.bookingmanangement.rest.v1.model;

import com.devonfw.application.bookingmanangement.general.domain.model.AbstractDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class TableDto extends AbstractDto {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

}
