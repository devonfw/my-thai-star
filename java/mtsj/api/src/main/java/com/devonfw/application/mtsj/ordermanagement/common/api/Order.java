package com.devonfw.application.mtsj.ordermanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

/**
 * TODO simon This type ...
 *
 */
public interface Order extends ApplicationEntity {

  public Long getBookingId();

  public void setBookingId(Long bookingId);

  public Long getInvitedGuestId();

  public void setInvitedGuestId(Long invitedGuestId);

  public Long getHostId();

  public void setHostId(Long hostId);

  public Long getStateId();

  public void setStateId(Long state);

  public Long getPaidId();

  public void setPaidId(Long paidId);
	
}
