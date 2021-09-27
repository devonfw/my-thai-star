package com.devonfw.app.dataaccess.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.app.dataaccess.CategoryEntity;

/**
 * {@link DefaultRepository} for {@link CategoryEntity}.
 */
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

}
