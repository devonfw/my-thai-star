package com.devonfw.application.bookingmanangement.rest.v1.model;

import java.time.Instant;

import com.devonfw.application.bookingmanangement.general.domain.model.AbstractDto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class InvitedGuestDto extends AbstractDto {

  private static final long serialVersionUID = 1L;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

}
