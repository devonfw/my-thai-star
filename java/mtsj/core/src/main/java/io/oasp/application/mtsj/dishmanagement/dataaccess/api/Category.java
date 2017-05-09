package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * @author pparrado
 *
 */
@Entity
@Table(name = "Category")
public class Category extends ApplicationPersistenceEntity {

  private String name;

  private String description;

  private int showOrder;

  /**
   * @return name
   */
  public String getName() {

    return this.name;
  }

  /**
   * @param name new value of {@link #getname}.
   */
  public void setName(String name) {

    this.name = name;
  }

  /**
   * @return description
   */
  public String getDescription() {

    return this.description;
  }

  /**
   * @param description new value of {@link #getdescription}.
   */
  public void setDescription(String description) {

    this.description = description;
  }

  /**
   * @return showOrder
   */
  public int getShowOrder() {

    return this.showOrder;
  }

  /**
   * @param showOrder new value of {@link #getshowOrder}.
   */
  public void setShowOrder(int showOrder) {

    this.showOrder = showOrder;
  }

}
