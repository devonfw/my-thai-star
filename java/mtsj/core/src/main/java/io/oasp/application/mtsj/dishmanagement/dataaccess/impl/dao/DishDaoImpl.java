package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyDaoQuerySupport;

/**
 * This is the implementation of {@link DishDao}.
 */
@Named
public class DishDaoImpl extends ApplicationDaoImpl<DishEntity> implements DishDao {

  /**
   * The constructor.
   */
  public DishDaoImpl() {

    super();
  }

  @Override
  public Class<DishEntity> getEntityClass() {

    return DishEntity.class;
  }

  @Override
  public PaginatedListTo<DishEntity> findDishs(DishSearchCriteriaTo criteria) {

    DishEntity dish = Alias.alias(DishEntity.class);
    EntityPathBase<DishEntity> alias = Alias.$(dish);

    JPAQuery query = (JPAQuery) new JPAQuery(getEntityManager()).from(alias);

    String searchBy = criteria.getSearchBy();
    if (searchBy != null) {
      query.where(Alias.$(dish.getName()).toLowerCase().contains(searchBy.toLowerCase())
          .or(Alias.$(dish.getDescription()).toLowerCase().contains(searchBy.toLowerCase())));
    }

    BigDecimal price = criteria.getMaxPrice();
    if (price != null) {
      query.where(Alias.$(dish.getPrice()).lt(price));
    }

    addOrderBy(query, alias, dish, criteria.getSort());

    return LegacyDaoQuerySupport.findPaginated(criteria, query, alias);

  }

  private void addOrderBy(JPAQuery query, EntityPathBase<DishEntity> alias, DishEntity dish, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(dish.getName()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(dish.getName()).toLowerCase().desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(dish.getDescription()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(dish.getDescription()).toLowerCase().desc());
          }
        } else if ("price".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(dish.getPrice()).asc());
          } else {
            query.orderBy(Alias.$(dish.getPrice()).desc());
          }
        }
      }
    }
  }

}
