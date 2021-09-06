package com.devonfw.application.mtsj.bookingmanangement.common.to;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity transport object of Table
 */
@Getter
@Setter
@ToString(callSuper = true)
public class TableEto extends AbstractEto {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

}
