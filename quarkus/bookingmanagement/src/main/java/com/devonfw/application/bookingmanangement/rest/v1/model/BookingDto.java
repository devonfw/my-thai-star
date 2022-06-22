package com.devonfw.application.bookingmanangement.rest.v1.model;

import java.time.Instant;
import java.util.List;

import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;

import com.devonfw.application.bookingmanangement.domain.model.BookingType;
import com.devonfw.application.bookingmanangement.general.domain.model.AbstractDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookingDto extends AbstractDto {

  private static final long serialVersionUID = 1L;

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

  private TableDto table;

  private List<InvitedGuestDto> invitedGuests;

}
