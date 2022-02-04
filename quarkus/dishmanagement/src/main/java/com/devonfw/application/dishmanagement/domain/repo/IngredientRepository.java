package com.devonfw.application.dishmanagement.domain.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.domain.model.IngredientEntity;

/**
 * {@link DefaultRepository} for {@link IngredientEntity}.
 */
public interface IngredientRepository extends JpaRepository<IngredientEntity, Long>, IngredientFragment {

}
