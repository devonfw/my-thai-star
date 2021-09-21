package com.devonfw.app.dishmanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.data.domain.Page;

import com.devonfw.app.dishmanagement.common.api.to.CategoryEto;
import com.devonfw.app.dishmanagement.common.api.to.CategorySearchCriteriaTo;
import com.devonfw.app.dishmanagement.common.api.to.DishCto;
import com.devonfw.app.dishmanagement.common.api.to.DishEto;
import com.devonfw.app.dishmanagement.common.api.to.DishSearchCriteriaTo;
import com.devonfw.app.dishmanagement.common.api.to.IngredientEto;
import com.devonfw.app.dishmanagement.common.api.to.IngredientSearchCriteriaTo;
import com.devonfw.app.dishmanagement.logic.api.Dishmanagement;
import com.devonfw.app.dishmanagement.service.api.rest.DishmanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Dishmanagement}.
 */
@Named("DishmanagementRestService")
public class DishmanagementRestServiceImpl implements DishmanagementRestService {

  @Inject
  private Dishmanagement dishmanagement;

  @Override
  public CategoryEto getCategory(long id) {

    return this.dishmanagement.findCategory(id);
  }

  @Override
  public CategoryEto saveCategory(CategoryEto category) {

    return this.dishmanagement.saveCategory(category);
  }

  @Override
  public void deleteCategory(long id) {

    this.dishmanagement.deleteCategory(id);
  }

  @Override
  public Page<CategoryEto> findCategorysByPost(CategorySearchCriteriaTo searchCriteriaTo) {

    return this.dishmanagement.findCategoryEtos(searchCriteriaTo);
  }

  @Override
  public DishCto getDish(long id) {

    return this.dishmanagement.findDish(id);
  }

  @Override
  public DishEto saveDish(DishEto dish) {

    return this.dishmanagement.saveDish(dish);
  }

  @Override
  public void deleteDish(long id) {

    this.dishmanagement.deleteDish(id);
  }

  @Override
  public Page<DishCto> findDishsByPost(DishSearchCriteriaTo searchCriteriaTo) {

    Page<DishCto> pageDishCto = this.dishmanagement.findDishCtos(searchCriteriaTo);
    return pageDishCto;
  }

  @Override
  public IngredientEto getIngredient(long id) {

    return this.dishmanagement.findIngredient(id);
  }

  @Override
  public IngredientEto saveIngredient(IngredientEto ingredient) {

    return this.dishmanagement.saveIngredient(ingredient);
  }

  @Override
  public void deleteIngredient(long id) {

    this.dishmanagement.deleteIngredient(id);
  }

  @Override
  public Page<IngredientEto> findIngredientsByPost(IngredientSearchCriteriaTo searchCriteriaTo) {

    return this.dishmanagement.findIngredientEtos(searchCriteriaTo);
  }

}
