package io.oasp.application.mtsj.dishmanagement.common.api;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Dish extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getDescription();

  public void setDescription(String description);

  public BigDecimal getPrice();

  public void setPrice(BigDecimal price);

  public String getImage();

  public void setImage(String image);

  public List<Ingredient> getExtras();

  public void setExtras(List<Ingredient> extras);

  public Collection<Category> getCategories();

  public void setCategories(Collection<Category> categories);

}
