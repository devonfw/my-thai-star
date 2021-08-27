package com.devonfw.application.mtsj.bookingmanangement.dataaccess;

import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@javax.persistence.Table(name = "T_Table")
public class TableEntity extends ApplicationPersistenceEntity {

  @Column(name = "SEATS_NUMBER")
  private Integer seatsNumber;

}
