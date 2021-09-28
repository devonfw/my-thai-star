package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.dataaccess.CategoryEntity;

/**
 * {@link DefaultRepository} for {@link CategoryEntity}.
 */
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>, CategoryFragment {

}
