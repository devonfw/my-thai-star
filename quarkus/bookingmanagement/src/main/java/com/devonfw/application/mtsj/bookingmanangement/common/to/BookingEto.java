package com.devonfw.application.mtsj.bookingmanangement.common.to;

import java.time.Instant;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;

import com.devonfw.application.mtsj.bookingmanangement.common.datatype.BookingType;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity transport object of Booking
 */
@Getter
@Setter
@ToString(callSuper = true)
public class BookingEto extends AbstractEto {

  @NotNull
  private String name;

  private String bookingToken;

  private String comment;

  @NotNull
  @Future
  private Instant bookingDate;

  private Instant expirationDate;

  private Instant creationDate;

  @NotNull
  private String email;

  private Boolean canceled;

  private BookingType bookingType;

  private Integer assistants;

}
