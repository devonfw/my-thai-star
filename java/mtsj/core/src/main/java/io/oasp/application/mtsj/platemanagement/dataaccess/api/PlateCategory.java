package io.oasp.application.mtsj.platemanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link PlateCategory}.
 */
@Entity
@Table(name = "PlateCategory")
public class PlateCategory extends ApplicationPersistenceEntity {

  private static final long serialVersionUID = 1L;

  private Long idPlate;

  private Long idCategory;

  /**
   * @return idPlate
   */
  public Long getIdPlate() {

    return this.idPlate;
  }

  /**
   * @param idPlate new value of {@link #getIdPlate}.
   */
  public void setIdPlate(Long idPlate) {

    this.idPlate = idPlate;
  }

  /**
   * @return idCategory
   */
  public Long getIdCategory() {

    return this.idCategory;
  }

  /**
   * @param idCategory new value of {@link #getIdCategory}.
   */
  public void setIdCategory(Long idCategory) {

    this.idCategory = idCategory;
  }

}
