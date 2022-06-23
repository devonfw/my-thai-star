package com.devonfw.application.bookingmanangement.domain.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationPersistenceEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Entity
@Table(name = "\"Table\"")
@ToString(callSuper = true, includeFieldNames = true)
public class TableEntity extends ApplicationPersistenceEntity {

  @Column(name = "SEATS_NUMBER")
  private Integer seatsNumber;

}
