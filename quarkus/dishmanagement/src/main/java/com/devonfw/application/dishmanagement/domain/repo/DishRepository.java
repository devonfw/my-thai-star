package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.domain.model.DishEntity;

/**
 * {@link DefaultRepository} for {@link DishEntity}.
 */
public interface DishRepository extends JpaRepository<DishEntity, Long>, DishFragment {

}
