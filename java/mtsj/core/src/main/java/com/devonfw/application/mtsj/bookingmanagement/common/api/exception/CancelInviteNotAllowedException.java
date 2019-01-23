package com.devonfw.application.mtsj.bookingmanagement.common.api.exception;

import net.sf.mmm.util.exception.api.NlsRuntimeException;

/**
 * Exception thrown when the user tries to cancel a booking in the previous hour
 *
 */
public class CancelInviteNotAllowedException extends NlsRuntimeException {

	/**
	 *
	 */
	private static final long serialVersionUID = 1L;

	public CancelInviteNotAllowedException() {
		super("The booking can not be cancelled.");
	}
}
