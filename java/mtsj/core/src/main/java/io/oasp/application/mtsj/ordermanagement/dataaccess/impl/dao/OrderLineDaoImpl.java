package io.oasp.application.mtsj.ordermanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderLineDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link OrderLineDao}.
 */
@Named
public class OrderLineDaoImpl extends ApplicationDaoImpl<OrderLineEntity> implements OrderLineDao {

  /**
   * The constructor.
   */
  public OrderLineDaoImpl() {

    super();
  }

  @Override
  public Class<OrderLineEntity> getEntityClass() {

    return OrderLineEntity.class;
  }

  @Override
  public PaginatedListTo<OrderLineEntity> findOrderLines(OrderLineSearchCriteriaTo criteria) {

    OrderLineEntity orderline = Alias.alias(OrderLineEntity.class);
    EntityPathBase<OrderLineEntity> alias = Alias.$(orderline);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    Long order = criteria.getOrderId();
    if (order != null && orderline.getOrder() != null) {
      query.where(Alias.$(orderline.getOrder().getId()).eq(order));
    }
    Long dish = criteria.getDishId();
    if (dish != null && orderline.getDish() != null) {
      query.where(Alias.$(orderline.getDish().getId()).eq(dish));
    }
    Integer amount = criteria.getAmount();
    if (amount != null) {
      query.where(Alias.$(orderline.getAmount()).eq(amount));
    }
    String comment = criteria.getComment();
    if (comment != null) {
      query.where(Alias.$(orderline.getComment()).eq(comment));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<OrderLineEntity> alias, OrderLineEntity orderline,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("dish".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(orderline.getDishId()).asc());
          } else {
            query.orderBy(Alias.$(orderline.getDishId()).desc());
          }
        } else if ("amount".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(orderline.getAmount()).asc());
          } else {
            query.orderBy(Alias.$(orderline.getAmount()).desc());
          }
        } else if ("comment".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(orderline.getComment()).asc());
          } else {
            query.orderBy(Alias.$(orderline.getComment()).desc());
          }
        }
      }
    }
  }

}