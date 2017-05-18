package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link DishCategory}.
 */
@Entity
@Table(name = "DishCategory")
public class DishCategory extends ApplicationPersistenceEntity {

  private static final long serialVersionUID = 1L;

  private Long idDish;

  private Long idCategory;

  /**
   * @return idDish
   */
  public Long getIdDish() {

    return this.idDish;
  }

  /**
   * @param idDish new value of {@link #getIdDish}.
   */
  public void setIdDish(Long idDish) {

    this.idDish = idDish;
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
