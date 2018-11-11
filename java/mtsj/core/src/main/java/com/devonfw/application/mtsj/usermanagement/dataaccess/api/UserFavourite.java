package com.devonfw.application.mtsj.usermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

@Entity
@Table(name = "UserFavourite")
public class UserFavourite extends ApplicationPersistenceEntity {

  private static final long serialVersionUID = 1L;

  private Long idUser;

  private Long idDish;

  /**
   * @return idUser
   */
  public Long getIdUser() {

    return this.idUser;
  }

  /**
   * @param idUser new value of {@link #getidUser}.
   */
  public void setIdUser(Long idUser) {

    this.idUser = idUser;
  }

  /**
   * @return idDish
   */
  public Long getIdDish() {

    return this.idDish;
  }

  /**
   * @param idDish new value of {@link #getidDish}.
   */
  public void setIdDish(Long idDish) {

    this.idDish = idDish;
  }

}
