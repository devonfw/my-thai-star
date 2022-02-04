package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.domain.DishSearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.model.DishEntity;

public interface DishFragment {

  Page<DishEntity> findDishs(DishSearchCriteriaDto criteria);
}
