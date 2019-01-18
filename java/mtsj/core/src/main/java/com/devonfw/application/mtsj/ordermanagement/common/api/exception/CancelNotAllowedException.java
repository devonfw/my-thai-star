package com.devonfw.application.mtsj.ordermanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

/**
 * Exception thrown when the user tries to cancel an order in the previous hour
 * of a booking
 *
 */
public class CancelNotAllowedException extends NlsRuntimeException {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * The constructor.
	 *
	 * @param message the error message
	 */
	public CancelNotAllowedException() {
		super("The order can not be cancelled.");
	}
}
