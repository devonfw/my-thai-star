package com.devonfw.application.mtsj.bookingmanagement.common.api;

import java.time.Instant;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface InvitedGuest extends ApplicationEntity {

  public Long getBookingId();

  public void setBookingId(Long bookingId);

  public String getGuestToken();

  public void setGuestToken(String guestToken);

  public String getEmail();

  public void setEmail(String email);

  public Boolean getAccepted();

  public void setAccepted(Boolean accepted);

  public Instant getModificationDate();

  public void setModificationDate(Instant modificationDate);

}
