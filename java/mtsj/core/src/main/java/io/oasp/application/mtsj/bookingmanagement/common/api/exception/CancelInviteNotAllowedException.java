package io.oasp.application.mtsj.bookingmanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

/**
 * Exception thrown when the user tries to cancel a booking in the previous hour
 *
 */
public class CancelInviteNotAllowedException extends NlsRuntimeException {

  public CancelInviteNotAllowedException() {
    super("The booking can not be cancelled.");
  }
}
