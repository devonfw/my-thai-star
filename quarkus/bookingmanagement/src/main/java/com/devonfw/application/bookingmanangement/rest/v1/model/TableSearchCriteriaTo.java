package com.devonfw.application.bookingmanangement.rest.v1.model;

import lombok.Data;

/**
 * used to find {@link com.devonfw.application.mtsj.bookingmanagement.common.api.Table}s.
 */
@Data
public class TableSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

}
