package com.devonfw.application.bookingmanangement.rest.v1.model;

import java.time.Instant;

import lombok.Data;

/**
 * Entity transport object of InvitedGuest
 */
@Data
public class InvitedGuestDto {

  private static final long serialVersionUID = 1L;

  private Long id;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

}
