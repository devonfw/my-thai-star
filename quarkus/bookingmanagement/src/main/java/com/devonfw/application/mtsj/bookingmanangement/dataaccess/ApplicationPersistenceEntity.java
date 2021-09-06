package com.devonfw.application.mtsj.bookingmanangement.dataaccess;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Version;

import lombok.Setter;
import lombok.ToString;

@Setter
@MappedSuperclass
@ToString
public abstract class ApplicationPersistenceEntity {

  private Long id;

  private Integer modificationCounter;

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  public Long getId() {

    return this.id;
  }

  @Version
  public Integer getModificationCounter() {

    return this.modificationCounter;
  }
}