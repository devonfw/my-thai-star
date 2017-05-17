package io.oasp.application.mtsj.reservationmanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Table extends ApplicationEntity {

  public int getSeatsNumber();

  public void setSeatsNumber(int seatsNumber);

}
