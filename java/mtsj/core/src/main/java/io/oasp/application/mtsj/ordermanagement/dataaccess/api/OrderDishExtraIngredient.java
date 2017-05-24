package io.oasp.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

/**
 * {@link ApplicationPersistenceEntity Entity} that represents a single {@link OrderDishExtraIngredient} of an
 * {@link OrderLineEntity}.
 */
@Entity
@Table(name = "OrderDishExtraIngredient")
public class OrderDishExtraIngredient extends ApplicationPersistenceEntity {

  private static final long serialVersionUID = 1L;

  private Long idOrderLine;

  private Long idIngredient;

  /**
   * @return idOrderLine
   */
  public Long getIdOrderLine() {

    return this.idOrderLine;
  }

  /**
   * @param idOrderLine new value of {@link #getidOrderLine}.
   */
  public void setIdOrderLine(Long idOrderLine) {

    this.idOrderLine = idOrderLine;
  }

  /**
   * @return idIngredient
   */
  public Long getIdIngredient() {

    return this.idIngredient;
  }

  /**
   * @param idIngredient new value of {@link #getidIngredient}.
   */
  public void setIdIngredient(Long idIngredient) {

    this.idIngredient = idIngredient;
  }

}
