package com.devonfw.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

/**
 * This exception is thrown if the guest token of an
 * {@link com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderEto} has no
 * {@link com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity} related.
 *
 */
public class NoInviteException extends NlsRuntimeException {

  public NoInviteException() {

    super("The invitation does not exist");
  }
}
