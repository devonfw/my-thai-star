package io.oasp.application.mtsj.bookingmanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Table extends ApplicationEntity {

  public int getSeatsNumber();

  public void setSeatsNumber(int seatsNumber);

}
