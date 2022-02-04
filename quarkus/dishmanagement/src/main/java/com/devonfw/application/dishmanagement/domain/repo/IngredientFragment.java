package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.domain.IngredientSearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.model.IngredientEntity;

public interface IngredientFragment {

  Page<IngredientEntity> findIngredients(IngredientSearchCriteriaDto criteria);
}
