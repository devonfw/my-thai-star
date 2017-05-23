package io.oasp.application.mtsj.ordermanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderDishExtraIngredientEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDishExtraIngredientDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link OrderDishExtraIngredientDao}.
 */
@Named
public class OrderDishExtraIngredientDaoImpl extends ApplicationDaoImpl<OrderDishExtraIngredientEntity>
    implements OrderDishExtraIngredientDao {

  /**
   * The constructor.
   */
  public OrderDishExtraIngredientDaoImpl() {

    super();
  }

  @Override
  public Class<OrderDishExtraIngredientEntity> getEntityClass() {

    return OrderDishExtraIngredientEntity.class;
  }

  @Override
  public PaginatedListTo<OrderDishExtraIngredientEntity> findOrderDishExtraIngredients(
      OrderDishExtraIngredientSearchCriteriaTo criteria) {

    OrderDishExtraIngredientEntity orderdishextraingredient = Alias.alias(OrderDishExtraIngredientEntity.class);
    EntityPathBase<OrderDishExtraIngredientEntity> alias = Alias.$(orderdishextraingredient);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    Long idOrderLine = criteria.getIdOrderLine();
    if (idOrderLine != null) {
      query.where(Alias.$(orderdishextraingredient.getIdOrderLine()).eq(idOrderLine));
    }
    Long idIngredient = criteria.getIdIngredient();
    if (idIngredient != null) {
      query.where(Alias.$(orderdishextraingredient.getIdIngredient()).eq(idIngredient));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<OrderDishExtraIngredientEntity> alias,
      OrderDishExtraIngredientEntity orderdishextraingredient, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("idOrderLine".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(orderdishextraingredient.getIdOrderLine()).asc());
          } else {
            query.orderBy(Alias.$(orderdishextraingredient.getIdOrderLine()).desc());
          }
        } else if ("idIngredient".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(orderdishextraingredient.getIdIngredient()).asc());
          } else {
            query.orderBy(Alias.$(orderdishextraingredient.getIdIngredient()).desc());
          }
        }
      }
    }
  }

}