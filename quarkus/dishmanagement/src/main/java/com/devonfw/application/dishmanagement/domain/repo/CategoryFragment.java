package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.domain.CategorySearchCriteriaTo;
import com.devonfw.application.dishmanagement.domain.model.CategoryEntity;

public interface CategoryFragment {

  Page<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria);
}
