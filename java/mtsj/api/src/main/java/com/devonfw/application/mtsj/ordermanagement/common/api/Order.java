package com.devonfw.application.mtsj.ordermanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

/**
 * TODO simon This type ...
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
  
  public Long getAddressId();

  public void setAddressId(Long addressId);
	

  /**
   * @return OrderTokenId
   */
  public String getOrderToken();

  /**
   * @param OrderToken setter for OrderToken attribute
   */
  public void setOrderToken(String OrderToken);

}
