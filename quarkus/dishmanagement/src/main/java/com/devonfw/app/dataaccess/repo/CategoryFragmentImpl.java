package com.devonfw.app.dataaccess.repo;

import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.app.dataaccess.CategoryEntity;
import com.devonfw.app.dataaccess.CategorySearchCriteriaTo;
import com.devonfw.app.dataaccess.QCategoryEntity;
import com.querydsl.jpa.impl.JPAQuery;

public class CategoryFragmentImpl implements CategoryFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria) {

    Pageable pageable = criteria.getPageable();
    QCategoryEntity categoryEntity = QCategoryEntity.categoryEntity;
    JPAQuery<CategoryEntity> query = new JPAQuery<CategoryEntity>(this.em);
    query.from(categoryEntity);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      query.where(categoryEntity.name.eq(name));
    }
    String description = criteria.getDescription();
    if ((description != null) && !description.isEmpty()) {
      query.where(categoryEntity.description.eq(description));
    }
    int showOrder = criteria.getShowOrder();
    query.where(categoryEntity.showOrder.eq(showOrder));

    List<CategoryEntity> categories = query.limit(pageable.getPageSize())
        .offset(pageable.getPageNumber() * pageable.getPageSize()).fetch();
    return new PageImpl<>(categories, PageRequest.of(pageable.getPageNumber(), pageable.getPageSize()),
        categories.size());

  }

}
