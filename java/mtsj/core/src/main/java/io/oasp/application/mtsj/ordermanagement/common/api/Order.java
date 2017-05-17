package io.oasp.application.mtsj.ordermanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Order extends ApplicationEntity {

  public Long getIdReservation();

  public void setIdReservation(Long idReservation);

  public Long getIdInvitationGuest();

  public void setIdInvitationGuest(Long idInvitationGuest);

}
