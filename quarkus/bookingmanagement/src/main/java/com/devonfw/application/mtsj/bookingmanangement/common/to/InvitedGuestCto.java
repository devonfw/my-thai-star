package com.devonfw.application.mtsj.bookingmanangement.common.to;

import lombok.Data;

/**
 * Composite transport object of InvitedGuest
 */
@Data
public class InvitedGuestCto {

  private static final long serialVersionUID = 1L;

  private InvitedGuestEto invitedGuest;

  private BookingEto booking;

}
