package io.oasp.application.mtsj.dishmanagement.common.api;

import java.math.BigDecimal;
import java.util.List;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

/**
 * Interface for a {@link Dish}
 *
 */
public interface Dish extends ApplicationEntity {

  /**
   * @return the name of the {@link Dish}
   */
  public String getName();

  /**
   * @param name of the {@link Dish}
   */
  public void setName(String name);

  /**
   * @return description of the {@link Dish}
   */
  public String getDescription();

  /**
   * @param description of the {@link Dish}
   */
  public void setDescription(String description);

  /**
   * @return price of the {@link Dish}
   */
  public BigDecimal getPrice();

  /**
   * @param price of the {@link Dish}
   */
  public void setPrice(BigDecimal price);

  /**
   * @return extra ingredients of the {@link Dish}
   */
  public List<Ingredient> getExtras();

  /**
   * @param extras ingredients of the {@link Dish}
   */
  public void setExtras(List<Ingredient> extras);

}
