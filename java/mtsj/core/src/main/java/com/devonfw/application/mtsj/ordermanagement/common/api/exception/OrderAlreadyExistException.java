package com.devonfw.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

/**
 * This exception is thrown if a {@link com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity} has
 * already {@link com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderEntity} related.
 *
 */
public class OrderAlreadyExistException extends NlsRuntimeException {

  public OrderAlreadyExistException() {

    super("The order for this booking already exist. Please cancel the order before create a new one.");
  }
}
