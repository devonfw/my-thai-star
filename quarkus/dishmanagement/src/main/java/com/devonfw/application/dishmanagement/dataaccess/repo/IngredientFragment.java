package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.dataaccess.IngredientEntity;
import com.devonfw.application.dishmanagement.dataaccess.IngredientSearchCriteriaTo;

/**
 * TODO snesarmo This type ...
 *
 */
public interface IngredientFragment {

  Page<IngredientEntity> findIngredients(IngredientSearchCriteriaTo criteria);
}
