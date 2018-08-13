package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.CategoryEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.CategoryDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyDaoQuerySupport;

/**
 * This is the implementation of {@link CategoryDao}.
 */
@Named
public class CategoryDaoImpl extends ApplicationDaoImpl<CategoryEntity> implements CategoryDao {

  /**
   * The constructor.
   */
  public CategoryDaoImpl() {

    super();
  }

  @Override
  public Class<CategoryEntity> getEntityClass() {

    return CategoryEntity.class;
  }

  @Override
  public PaginatedListTo<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria) {

    CategoryEntity category = Alias.alias(CategoryEntity.class);
    EntityPathBase<CategoryEntity> alias = Alias.$(category);
    JPAQuery query = (JPAQuery) new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(category.getName()).toLowerCase().eq(name.toLowerCase()));
    }
    String description = criteria.getDescription();
    if (description != null) {
      query.where(Alias.$(category.getDescription()).toLowerCase().eq(description.toLowerCase()));
    }
    int showOrder = criteria.getShowOrder();
    query.where(Alias.$(category.getShowOrder()).eq(showOrder));
    return LegacyDaoQuerySupport.findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<CategoryEntity> alias, CategoryEntity category,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(category.getName()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(category.getName()).toLowerCase().desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(category.getDescription()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(category.getDescription()).toLowerCase().desc());
          }
        } else if ("showOrder".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(category.getShowOrder()).asc());
          } else {
            query.orderBy(Alias.$(category.getShowOrder()).desc());
          }
        }
      }
    }
  }

}