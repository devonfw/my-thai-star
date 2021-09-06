package com.devonfw.application.mtsj.bookingmanangement.common.to;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * Entity transport object of InvitedGuest
 */
@Getter
@Setter
@ToString(callSuper = true)
public class InvitedGuestEto extends AbstractEto {

  private static final long serialVersionUID = 1L;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

}
