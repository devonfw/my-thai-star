package io.oasp.application.mtsj.reservationmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.reservationmanagement.common.api.ReservationType;

@Entity
@Table(name = "ReservationType")
public class ReservationTypeEntity extends ApplicationPersistenceEntity implements ReservationType {

  private String name;

  private static final long serialVersionUID = 1L;

  public ReservationTypeEntity() {
    super();
  }

  @Override
  public String getName() {

    return this.name;
  }

  @Override
  public void setName(String name) {

    this.name = name;

  }

}
