package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.domain.model.CategoryEntity;

/**
 * {@link DefaultRepository} for {@link CategoryEntity}.
 */
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long>, CategoryFragment {

}
