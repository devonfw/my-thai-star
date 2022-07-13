package com.devonfw.application.bookingmanangement.rest.v1.model;

import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationSearchCriteriaDto;

import lombok.Data;

@Data
public class TableSearchCriteriaTo extends ApplicationSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

}
