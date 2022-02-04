package com.devonfw.application.dishmanagement.domain.repo;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.dishmanagement.domain.DishSearchCriteriaTo;
import com.devonfw.application.dishmanagement.domain.model.DishEntity;
import com.devonfw.application.dishmanagement.domain.model.QDishEntity;
import com.querydsl.jpa.impl.JPAQuery;

public class DishFragmentImpl implements DishFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<DishEntity> findDishs(DishSearchCriteriaTo criteria) {

    Pageable pageable = criteria.getPageable();
    QDishEntity dishEntity = QDishEntity.dishEntity;

    JPAQuery<DishEntity> query = new JPAQuery<DishEntity>(this.em);
    query.from(dishEntity);

    String searchBy = criteria.getSearchBy();
    if (searchBy != null) {
      query.where(dishEntity.name.contains(searchBy).or(dishEntity.description.contains(searchBy)));
    }

    BigDecimal price = criteria.getMaxPrice();
    if (price != null) {
      query.where(dishEntity.price.lt(price));
    }
    List<DishEntity> dishes = query.limit(pageable.getPageSize())
        .offset(pageable.getPageNumber() * pageable.getPageSize()).fetch();
    return new PageImpl<>(dishes, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()), dishes.size());
  }

}
