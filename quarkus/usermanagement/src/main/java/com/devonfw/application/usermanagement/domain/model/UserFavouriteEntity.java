package com.devonfw.application.usermanagement.domain.model;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.usermanagement.general.domain.model.ApplicationPersistenceEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Setter
@Getter
@Entity
@Table(name = "UserFavourite")
public class UserFavouriteEntity extends ApplicationPersistenceEntity {

  private Long idUser;

  private Long idDish;

}
