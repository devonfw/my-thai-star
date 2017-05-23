package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.IngredientDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link IngredientDao}.
 */
@Named
public class IngredientDaoImpl extends ApplicationDaoImpl<IngredientEntity> implements IngredientDao {

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
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(ingredient.getName()).eq(name));
    }
    String description = criteria.getDescription();
    if (description != null) {
      query.where(Alias.$(ingredient.getDescription()).eq(description));
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
            query.orderBy(Alias.$(ingredient.getName()).asc());
          } else {
            query.orderBy(Alias.$(ingredient.getName()).desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(ingredient.getDescription()).asc());
          } else {
            query.orderBy(Alias.$(ingredient.getDescription()).desc());
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