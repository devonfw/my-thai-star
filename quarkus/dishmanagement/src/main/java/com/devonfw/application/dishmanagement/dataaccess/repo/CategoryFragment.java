package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.dishmanagement.dataaccess.CategoryEntity;
import com.devonfw.application.dishmanagement.dataaccess.CategorySearchCriteriaTo;

/**
 * TODO snesarmo This type ...
 *
 */
public interface CategoryFragment {

  Page<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria);
}
