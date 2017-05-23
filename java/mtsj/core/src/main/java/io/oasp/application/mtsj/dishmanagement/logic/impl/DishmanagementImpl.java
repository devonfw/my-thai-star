package io.oasp.application.mtsj.dishmanagement.logic.impl;

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.CategoryEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.CategoryDao;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.IngredientDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishCto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;
import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of dishmanagement
 */
@Named
@Transactional
public class DishmanagementImpl extends AbstractComponentFacade implements Dishmanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(DishmanagementImpl.class);

  /**
   * @see #getCategoryDao()
   */
  @Inject
  private CategoryDao categoryDao;

  /**
   * @see #getDishDao()
   */
  @Inject
  private DishDao dishDao;

  /**
   * @see #getIngredientDao()
   */
  @Inject
  private IngredientDao ingredientDao;

  /**
   * The constructor.
   */
  public DishmanagementImpl() {

    super();
  }

  @Override
  public CategoryEto findCategory(Long id) {

    LOG.debug("Get Category with id {} from database.", id);
    return getBeanMapper().map(getCategoryDao().findOne(id), CategoryEto.class);
  }

  @Override
  public PaginatedListTo<CategoryEto> findCategoryEtos(CategorySearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<CategoryEntity> categorys = getCategoryDao().findCategorys(criteria);
    return mapPaginatedEntityList(categorys, CategoryEto.class);
  }

  @Override
  public boolean deleteCategory(Long categoryId) {

    CategoryEntity category = getCategoryDao().find(categoryId);
    getCategoryDao().delete(category);
    LOG.debug("The category with id '{}' has been deleted.", categoryId);
    return true;
  }

  @Override
  public CategoryEto saveCategory(CategoryEto category) {

    Objects.requireNonNull(category, "category");
    CategoryEntity categoryEntity = getBeanMapper().map(category, CategoryEntity.class);

    // initialize, validate categoryEntity here if necessary
    CategoryEntity resultEntity = getCategoryDao().save(categoryEntity);
    LOG.debug("Category with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, CategoryEto.class);
  }

  /**
   * Returns the field 'categoryDao'.
   *
   * @return the {@link CategoryDao} instance.
   */
  public CategoryDao getCategoryDao() {

    return this.categoryDao;
  }

  @Override
  public DishCto findDish(Long id) {

    LOG.debug("Get Dish with id {} from database.", id);
    DishEntity entity = getDishDao().findOne(id);
    DishCto cto = new DishCto();
    cto.setCategories(getBeanMapper().mapList(entity.getCategories(), CategoryEto.class));
    cto.setDish(getBeanMapper().map(entity, DishEto.class));
    cto.setExtras(getBeanMapper().mapList(entity.getExtras(), IngredientEto.class));
    return cto;
  }

  @Override
  public PaginatedListTo<DishEto> findDishEtos(DishSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<DishEntity> dishs = getDishDao().findDishs(criteria);
    return mapPaginatedEntityList(dishs, DishEto.class);
  }

  @Override
  public boolean deleteDish(Long dishId) {

    DishEntity dish = getDishDao().find(dishId);
    getDishDao().delete(dish);
    LOG.debug("The dish with id '{}' has been deleted.", dishId);
    return true;
  }

  @Override
  public DishEto saveDish(DishEto dish) {

    Objects.requireNonNull(dish, "dish");
    DishEntity dishEntity = getBeanMapper().map(dish, DishEntity.class);

    // initialize, validate dishEntity here if necessary
    DishEntity resultEntity = getDishDao().save(dishEntity);
    LOG.debug("Dish with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, DishEto.class);
  }

  /**
   * Returns the field 'dishDao'.
   *
   * @return the {@link DishDao} instance.
   */
  public DishDao getDishDao() {

    return this.dishDao;
  }

  @Override
  public IngredientEto findIngredient(Long id) {

    LOG.debug("Get Ingredient with id {} from database.", id);
    return getBeanMapper().map(getIngredientDao().findOne(id), IngredientEto.class);
  }

  @Override
  public PaginatedListTo<IngredientEto> findIngredientEtos(IngredientSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<IngredientEntity> ingredients = getIngredientDao().findIngredients(criteria);
    return mapPaginatedEntityList(ingredients, IngredientEto.class);
  }

  @Override
  public boolean deleteIngredient(Long ingredientId) {

    IngredientEntity ingredient = getIngredientDao().find(ingredientId);
    getIngredientDao().delete(ingredient);
    LOG.debug("The ingredient with id '{}' has been deleted.", ingredientId);
    return true;
  }

  @Override
  public IngredientEto saveIngredient(IngredientEto ingredient) {

    Objects.requireNonNull(ingredient, "ingredient");
    IngredientEntity ingredientEntity = getBeanMapper().map(ingredient, IngredientEntity.class);

    // initialize, validate ingredientEntity here if necessary
    IngredientEntity resultEntity = getIngredientDao().save(ingredientEntity);
    LOG.debug("Ingredient with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, IngredientEto.class);
  }

  /**
   * Returns the field 'ingredientDao'.
   *
   * @return the {@link IngredientDao} instance.
   */
  public IngredientDao getIngredientDao() {

    return this.ingredientDao;
  }

}
