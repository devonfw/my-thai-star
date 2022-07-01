package com.devonfw.application.mtsj.general.common.api.exception;

import com.devonfw.application.mtsj.general.common.api.NlsBundleApplicationRoot;

/**
 * TODO bkurella This type ...
 *
 */
public class UserAlreadyExistsException extends ApplicationBusinessException {

  /** UID for serialization. */
  private static final long serialVersionUID = 1L;

  /**
   * The constructor.
   */
  public UserAlreadyExistsException() {

    this(null);
  }

  /**
   * The constructor.
   *
   * @param cause The root cause of this exception.
   */
  public UserAlreadyExistsException(Throwable cause) {

    super(cause, createBundle(NlsBundleApplicationRoot.class).errorUserAlreadyExists());
  }

}