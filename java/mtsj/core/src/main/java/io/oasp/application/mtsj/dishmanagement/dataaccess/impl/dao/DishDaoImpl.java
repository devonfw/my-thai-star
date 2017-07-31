package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

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

    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String searchBy = criteria.getSearchBy();
    if (searchBy != null) {
      query.where(Alias.$(dish.getName()).contains(searchBy).or(Alias.$(dish.getDescription()).contains(searchBy)));
    }

    BigDecimal price = criteria.getMaxPrice();
    if (price != null) {
      query.where(Alias.$(dish.getPrice()).lt(price));
    }

    addOrderBy(query, alias, dish, criteria.getSort());

    return findPaginated(criteria, query, alias);

  }

  private void addOrderBy(JPAQuery query, EntityPathBase<DishEntity> alias, DishEntity dish, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(dish.getName()).asc());
          } else {
            query.orderBy(Alias.$(dish.getName()).desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(dish.getDescription()).asc());
          } else {
            query.orderBy(Alias.$(dish.getDescription()).desc());
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
