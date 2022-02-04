package com.devonfw.application.dishmanagement.domain.repo;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.dishmanagement.domain.IngredientSearchCriteriaDto;
import com.devonfw.application.dishmanagement.domain.model.IngredientEntity;
import com.devonfw.application.dishmanagement.domain.model.QIngredientEntity;
import com.querydsl.jpa.impl.JPAQuery;

public class IngerdientFragmentImpl implements IngredientFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<IngredientEntity> findIngredients(IngredientSearchCriteriaDto criteria) {

    Pageable pageable = criteria.getPageable();
    QIngredientEntity ingredientEntity = QIngredientEntity.ingredientEntity;

    JPAQuery<IngredientEntity> query = new JPAQuery<IngredientEntity>(this.em);
    query.from(ingredientEntity);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      query.where(ingredientEntity.name.eq(criteria.getNameOption().toString()));
    }
    String description = criteria.getDescription();
    if ((description != null) && !description.isEmpty()) {
      query.where(ingredientEntity.description.eq(criteria.getDescriptionOption().toString()));
    }

    BigDecimal price = criteria.getPrice();
    if (price != null) {
      query.where(ingredientEntity.price.eq(price));
    }
    List<IngredientEntity> ingredients = query.limit(pageable.getPageSize())
        .offset(pageable.getPageNumber() * pageable.getPageSize()).fetch();
    return new PageImpl<>(ingredients, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()),
        ingredients.size());

  }

}
