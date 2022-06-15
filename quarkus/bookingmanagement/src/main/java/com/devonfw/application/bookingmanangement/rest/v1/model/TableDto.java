package com.devonfw.application.bookingmanangement.rest.v1.model;

import lombok.Data;

/**
 * Entity transport object of Table
 */
@Data
public class TableDto {

  private static final long serialVersionUID = 1L;

  private Long id;

  private Integer seatsNumber;

}
