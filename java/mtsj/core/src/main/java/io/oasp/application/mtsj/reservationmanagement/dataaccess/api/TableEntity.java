package io.oasp.application.mtsj.reservationmanagement.dataaccess.api;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.reservationmanagement.common.api.Table;

/**
 * @author rudiazma
 */
public class TableEntity extends ApplicationPersistenceEntity implements Table {

  private static final long serialVersionUID = 1L;

  private int seatsNumber;

  @Override
  public int getSeatsNumber() {

    return this.seatsNumber;
  }

  @Override
  public void setSeatsNumber(int seatsNumber) {

    this.seatsNumber = seatsNumber;

  }

}
