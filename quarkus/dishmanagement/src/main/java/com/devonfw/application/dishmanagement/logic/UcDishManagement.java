package com.devonfw.application.dishmanagement.logic;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.dishmanagement.common.mapper.CategoryMapper;
import com.devonfw.application.dishmanagement.common.mapper.DishMapper;
import com.devonfw.application.dishmanagement.common.mapper.IngredientMapper;
import com.devonfw.application.dishmanagement.common.to.CategoryEto;
import com.devonfw.application.dishmanagement.common.to.DishCto;
import com.devonfw.application.dishmanagement.common.to.DishEto;
import com.devonfw.application.dishmanagement.common.to.IngredientEto;
import com.devonfw.application.dishmanagement.dataaccess.CategoryEntity;
import com.devonfw.application.dishmanagement.dataaccess.CategorySearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.DishEntity;
import com.devonfw.application.dishmanagement.dataaccess.DishSearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.IngredientEntity;
import com.devonfw.application.dishmanagement.dataaccess.IngredientSearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.repo.CategoryRepository;
import com.devonfw.application.dishmanagement.dataaccess.repo.DishRepository;
import com.devonfw.application.dishmanagement.dataaccess.repo.IngredientRepository;

import lombok.extern.slf4j.Slf4j;

@Named
@Transactional
@Slf4j
public class UcDishManagement {

  private static final Logger LOG = LoggerFactory.getLogger(UcDishManagement.class);

  @Inject
  CategoryRepository categoryRepo;

  @Inject
  CategoryMapper categoryMapper;

  @Inject
  DishRepository dishRepository;

  @Inject
  DishMapper dishMapper;

  @Inject
  IngredientRepository ingredientRepository;

  @Inject
  IngredientMapper ingredientMapper;

  public CategoryEto findCategory(Long id) {

    Optional<CategoryEntity> entity = this.categoryRepo.findById(id);
    return this.categoryMapper.mapTo(entity.get());
  }

  public Page<CategoryEto> findCategoryEtos(CategorySearchCriteriaTo criteria) {

    Page<CategoryEto> pagListTo = null;
    Page<CategoryEntity> categories = this.categoryRepo.findCategorys(criteria);
    List<CategoryEto> etos = this.categoryMapper.mapList(categories.getContent());
    if (etos.size() > 0) {
      Pageable pagResultTo = PageRequest.of(criteria.getPageable().getPageNumber(), etos.size());
      pagListTo = new PageImpl<>(etos, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;
  }

  public boolean deleteCategory(Long categoryId) {

    this.categoryRepo.deleteById(categoryId);
    LOG.info("Entity with Id " + categoryId + " is deleted ");
    return true;
  }

  public CategoryEto saveCategory(CategoryEto category) {

    CategoryEntity entity = this.categoryRepo.save(this.categoryMapper.mapTo(category));

    return this.categoryMapper.mapTo(entity);
  }

  public DishCto findDish(Long id) {

    Optional<DishEntity> dishEntity = this.dishRepository.findById(id);
    DishEntity entity = dishEntity.get();
    DishCto cto = new DishCto();
    if (entity != null) {
      cto.setDish(this.dishMapper.mapTo(entity));
      cto.setCategories(this.categoryMapper.mapList(entity.getCategories()));
      cto.setExtras(this.ingredientMapper.mapList(entity.getExtras()));
    }

    return cto;
  }

  public Page<DishCto> findDishCtos(DishSearchCriteriaTo criteria) {

    Page<DishCto> pagListTo = null;
    Page<DishEntity> entities = this.dishRepository.findDishs(criteria);
    List<DishEntity> dishes = entities.getContent();
    List<DishCto> ctos = new ArrayList<>(dishes.size());
    for (DishEntity dish : dishes) {
      DishCto dishCto = new DishCto();
      dishCto.setDish(this.dishMapper.mapTo(dish));
      dishCto.setCategories(this.categoryMapper.mapList(dish.getCategories()));
      dishCto.setExtras(this.ingredientMapper.mapList(dish.getExtras()));
      ctos.add(dishCto);
    }
    if (!criteria.getCategories().isEmpty()) {
      ctos = categoryFilter(ctos, criteria.getCategories());
    }
    if (ctos.size() > 0) {
      Pageable pagResultTo = PageRequest.of(criteria.getPageable().getPageNumber(), ctos.size());
      pagListTo = new PageImpl<>(ctos, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;
  }

  private List<DishCto> categoryFilter(List<DishCto> dishes, List<CategoryEto> categories) {

    List<DishCto> dishFiltered = new ArrayList<>();
    for (DishCto dish : dishes) {

      List<CategoryEto> entityCats = dish.getCategories();
      for (CategoryEto entityCat : entityCats) {
        for (CategoryEto category : categories) {
          if (category.getId().equals(entityCat.getId())) {
            if (!dishAlreadyAdded(dishFiltered, dish)) {
              dishFiltered.add(dish);
              break;
            }

          }
        }
      }

    }

    return dishFiltered;
  }

  private boolean dishAlreadyAdded(List<DishCto> dishEntitiesFiltered, DishCto dishEntity) {

    boolean result = false;
    for (DishCto entity : dishEntitiesFiltered) {
      Long entityId = entity.getDish().getId();
      Long dishEntityId = dishEntity.getDish().getId();
      if (entityId.equals(dishEntityId)) {
        result = true;
        break;
      }
    }
    return result;
  }

  public boolean deleteDish(Long dishId) {

    this.dishRepository.deleteById(dishId);
    LOG.info("Entity with Id " + dishId + " is deleted ");
    return true;
  }

  public DishEto saveDish(DishEto dish) {

    DishEntity dishEntity = this.dishRepository.save(this.dishMapper.mapTo(dish));
    return this.dishMapper.mapTo(dishEntity);
  }

  public IngredientEto findIngredient(Long id) {

    IngredientEntity ingredient = this.ingredientRepository.getOne(id);
    return this.ingredientMapper.mapTo(ingredient);
  }

  public Page<IngredientEto> findIngredientEtos(IngredientSearchCriteriaTo criteria) {

    Page<IngredientEto> pagListTo = null;
    Page<IngredientEntity> entities = this.ingredientRepository.findIngredients(criteria);
    List<IngredientEto> ingredients = this.ingredientMapper.mapList(entities.getContent());
    if (ingredients.size() > 0) {
      Pageable pagResultTo = PageRequest.of(criteria.getPageable().getPageNumber(), ingredients.size());
      pagListTo = new PageImpl<>(ingredients, pagResultTo, pagResultTo.getPageSize());
    }
    return pagListTo;
  }

  public boolean deleteIngredient(Long ingredientId) {

    this.ingredientRepository.deleteById(ingredientId);
    LOG.info("Entity with Id " + ingredientId + " is deleted ");
    return true;
  }

  public IngredientEto saveIngredient(IngredientEto ingredient) {

    IngredientEntity entity = this.ingredientRepository.save(this.ingredientMapper.mapTo(ingredient));
    return this.ingredientMapper.mapTo(entity);
  }

}
