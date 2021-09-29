package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.dataaccess.DishEntity;
import com.devonfw.application.dishmanagement.dataaccess.DishSearchCriteriaTo;

public interface DishFragment {

  Page<DishEntity> findDishs(DishSearchCriteriaTo criteria);
}
