package com.devonfw.application.mtsj.bookingmanangement.common.to;

import java.time.Instant;

import lombok.Data;

/**
 * used to find {@link com.devonfw.application.mtsj.bookingmanagement.common.api.InvitedGuest}s.
 */
@Data
public class InvitedGuestSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;
}
