package com.devonfw.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

import com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.BookingEntity;
import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;

/**
 * This exception is thrown if a {@link BookingEntity} has already {@link OrderEntity} related.
 *
 */
public class OrderAlreadyExistException extends NlsRuntimeException {

  public OrderAlreadyExistException() {
    super("The order for this booking already exist. Please cancel the order before create a new one.");
  }
}
