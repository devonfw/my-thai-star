package io.oasp.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;

/**
 * This exception is thrown if the guest token of an {@link OrderEto} has no {@link BookingEntity} related.
 *
 */
public class NoInviteException extends NlsRuntimeException {

  public NoInviteException() {
    super("The invitation does not exist");
  }
}
