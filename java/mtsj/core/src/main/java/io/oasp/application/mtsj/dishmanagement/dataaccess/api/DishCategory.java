package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * @author pparrado
 *
 */
@Entity
@Table(name = "DishCategory")
public class DishCategory extends ApplicationPersistenceEntity {

  private Long idDish;

  private Long IdCategory;

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

  /**
   * @return idCategory
   */
  public Long getIdCategory() {

    return this.IdCategory;
  }

  /**
   * @param idCategory new value of {@link #getidCategory}.
   */
  public void setIdCategory(Long idCategory) {

    this.IdCategory = idCategory;
  }

}
