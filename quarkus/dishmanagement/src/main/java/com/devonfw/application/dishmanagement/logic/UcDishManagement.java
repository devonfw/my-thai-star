package com.devonfw.application.dishmanagement.logic;

import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Named;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.common.mapper.CategoryMapper;
import com.devonfw.application.dishmanagement.common.to.CategoryEto;
import com.devonfw.application.dishmanagement.common.to.DishCto;
import com.devonfw.application.dishmanagement.common.to.DishEto;
import com.devonfw.application.dishmanagement.common.to.IngredientEto;
import com.devonfw.application.dishmanagement.dataaccess.CategoryEntity;
import com.devonfw.application.dishmanagement.dataaccess.CategorySearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.DishSearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.IngredientSearchCriteriaTo;
import com.devonfw.application.dishmanagement.dataaccess.repo.CategoryRepository;

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

  public CategoryEto findCategory(Long id) {

    Optional<CategoryEntity> entity = this.categoryRepo.findById(id);
    return this.categoryMapper.mapTo(entity.get());
  }

  public Page<CategoryEto> findCategoryEtos(CategorySearchCriteriaTo criteria) {

    return null;
  }

  public boolean deleteCategory(Long categoryId) {

    this.categoryRepo.deleteById(categoryId);
    LOG.info("Entity with Id " + categoryId + " is ");
    return true;
  }

  public CategoryEto saveCategory(CategoryEto category) {

    // TODO Auto-generated method stub
    return null;
  }

  public DishCto findDish(Long id) {

    // TODO Auto-generated method stub
    return null;
  }

  public Page<DishCto> findDishCtos(DishSearchCriteriaTo criteria) {

    // TODO Auto-generated method stub
    return null;
  }

  public boolean deleteDish(Long dishId) {

    // TODO Auto-generated method stub
    return false;
  }

  public DishEto saveDish(DishEto dish) {

    // TODO Auto-generated method stub
    return null;
  }

  public IngredientEto findIngredient(Long id) {

    // TODO Auto-generated method stub
    return null;
  }

  public Page<IngredientEto> findIngredientEtos(IngredientSearchCriteriaTo criteria) {

    // TODO Auto-generated method stub
    return null;
  }

  public boolean deleteIngredient(Long ingredientId) {

    // TODO Auto-generated method stub
    return false;
  }

  public IngredientEto saveIngredient(IngredientEto ingredient) {

    // TODO Auto-generated method stub
    return null;
  }

}
