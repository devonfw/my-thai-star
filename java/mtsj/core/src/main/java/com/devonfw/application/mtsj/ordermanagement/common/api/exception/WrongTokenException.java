package com.devonfw.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;
import net.sf.mmm.util.nls.api.NlsMessage;

/**
 * This exception is thrown if the token of an
 * {@link com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderEto} is not well formed (wrong prefix).
 *
 */
public class WrongTokenException extends NlsRuntimeException {

  /**
   *
   */
  private static final long serialVersionUID = 1L;

  /**
   * The constructor.
   *
   * @param message the error {@link #getNlsMessage() message}.
   */
  public WrongTokenException(NlsMessage message) {

    super(message);
  }

  public WrongTokenException() {

    super("Not a valid token");
  }

  public WrongTokenException(String message) {

    super(message);
  }

}
