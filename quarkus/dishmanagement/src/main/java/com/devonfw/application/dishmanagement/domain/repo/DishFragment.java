package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.domain.DishSearchCriteriaTo;
import com.devonfw.application.dishmanagement.domain.model.DishEntity;

public interface DishFragment {

  Page<DishEntity> findDishs(DishSearchCriteriaTo criteria);
}
