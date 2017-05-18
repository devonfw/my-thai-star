package io.oasp.application.mtsj.ordermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Order extends ApplicationEntity {

  public Long getIdBooking();

  public void setIdBooking(Long idBooking);

  public Long getIdInvitedGuest();

  public void setIdInvitedGuest(Long idInvitedGuest);

}
