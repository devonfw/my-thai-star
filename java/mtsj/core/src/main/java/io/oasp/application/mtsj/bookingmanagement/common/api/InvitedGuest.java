package io.oasp.application.mtsj.bookingmanagement.common.api;

import java.sql.Timestamp;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface InvitedGuest extends ApplicationEntity {

  public Long getBookingId();

  public void setBookingId(Long bookingId);

  public String getGuestToken();

  public void setGuestToken(String guestToken);

  public String getEmail();

  public void setEmail(String email);

  public Boolean getAccepted();

  public void setAccepted(Boolean accepted);

  public Timestamp getModificationDate();

  public void setModificationDate(Timestamp modificationDate);

}
