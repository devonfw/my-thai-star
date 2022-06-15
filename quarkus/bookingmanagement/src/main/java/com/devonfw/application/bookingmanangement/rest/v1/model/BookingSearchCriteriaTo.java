package com.devonfw.application.bookingmanangement.rest.v1.model;

import java.time.Instant;

import com.devonfw.application.bookingmanangement.domain.model.BookingType;
import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationSearchCriteriaDto;

import lombok.Data;

/**
 *
 *
 * used to find {@link com.devonfw.application.mtsj.bookingmanagement.common.api.Booking}s.
 */
@Data
public class BookingSearchCriteriaTo extends ApplicationSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private String name;

  private String bookingToken;

  private String comment;

  private Instant bookingDate;

  private Instant expirationDate;

  private Instant creationDate;

  private String email;

  private Boolean canceled;

  private BookingType bookingType;

  private Long tableId;

  private Long orderId;

  private Integer assistants;

  private Long userId;

}
