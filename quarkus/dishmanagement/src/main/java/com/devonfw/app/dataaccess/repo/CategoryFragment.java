package com.devonfw.app.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.app.dataaccess.CategoryEntity;
import com.devonfw.app.dataaccess.CategorySearchCriteriaTo;

/**
 * TODO snesarmo This type ...
 *
 */
public interface CategoryFragment {

  Page<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria);
}
