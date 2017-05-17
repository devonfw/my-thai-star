package io.oasp.application.mtsj.platemanagement.common.api;

import java.math.BigDecimal;
import java.util.List;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.Ingredient;

/**
 * Interface for a {@link Plate}
 *
 */
public interface Plate extends ApplicationEntity {

  /**
   * @return the name of the {@link Plate}
   */
  public String getName();

  /**
   * @param name of the {@link Plate}
   */
  public void setName(String name);

  /**
   * @return description of the {@link Plate}
   */
  public String getDescription();

  /**
   * @param description of the {@link Plate}
   */
  public void setDescription(String description);

  /**
   * @return price of the {@link Plate}
   */
  public BigDecimal getPrice();

  /**
   * @param price of the {@link Plate}
   */
  public void setPrice(BigDecimal price);

  /**
   * @return extra ingredients of the {@link Plate}
   */
  public List<Ingredient> getExtras();

  /**
   * @param extras ingredients of the {@link Plate}
   */
  public void setExtras(List<Ingredient> extras);

}
