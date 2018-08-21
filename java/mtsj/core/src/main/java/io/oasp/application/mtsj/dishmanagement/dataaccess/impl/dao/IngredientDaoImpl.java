package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.IngredientDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyApplicationDaoImpl;

/**
 * This is the implementation of {@link IngredientDao}.
 */
@Named
public class IngredientDaoImpl extends LegacyApplicationDaoImpl<IngredientEntity> implements IngredientDao {

  /**
   * The constructor.
   */
  public IngredientDaoImpl() {

    super();
  }

  @Override
  public Class<IngredientEntity> getEntityClass() {

    return IngredientEntity.class;
  }

  @Override
  public PaginatedListTo<IngredientEntity> findIngredients(IngredientSearchCriteriaTo criteria) {

    IngredientEntity ingredient = Alias.alias(IngredientEntity.class);
    EntityPathBase<IngredientEntity> alias = Alias.$(ingredient);
    JPAQuery<IngredientEntity> query = new JPAQuery<IngredientEntity>(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(ingredient.getName()).toLowerCase().eq(name.toLowerCase()));
    }
    String description = criteria.getDescription();
    if (description != null) {
      query.where(Alias.$(ingredient.getDescription()).toLowerCase().eq(description.toLowerCase()));
    }
    BigDecimal price = criteria.getPrice();
    if (price != null) {
      query.where(Alias.$(ingredient.getPrice()).eq(price));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<IngredientEntity> alias, IngredientEntity ingredient,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(ingredient.getName()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(ingredient.getName()).toLowerCase().desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(ingredient.getDescription()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(ingredient.getDescription()).toLowerCase().desc());
          }
        } else if ("price".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(ingredient.getPrice()).asc());
          } else {
            query.orderBy(Alias.$(ingredient.getPrice()).desc());
          }
        }
      }
    }
  }

}