package io.oasp.application.mtsj.general.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;

/**
 * This exception is thrown if the token of an {@link OrderEto} has no {@link BookingEntity} related.
 *
 */
public class NoBookingException extends NlsRuntimeException {

  private String details;

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  /**
   * The constructor.
   *
   * @param message the error message
   */
  public NoBookingException(String message) {
    super(message);
    this.details = "blablabla";
  }
}
