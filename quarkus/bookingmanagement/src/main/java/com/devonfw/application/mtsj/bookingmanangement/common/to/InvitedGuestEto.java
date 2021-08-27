package com.devonfw.application.mtsj.bookingmanangement.common.to;

import java.time.Instant;

import lombok.Data;

/**
 * Entity transport object of InvitedGuest
 */
@Data
public class InvitedGuestEto {

  private static final long serialVersionUID = 1L;

  private Long id;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

}
