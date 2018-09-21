package io.oasp.application.mtsj.ordermanagement.dataaccess.impl.dao;

import java.util.List;

import java.sql.Timestamp;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderedDishesPerDayEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderedDishesPerDayDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderedDishesSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link OrderLineDao}.
 */
@Named
public class OrderedDishesPerDayDaoImpl extends ApplicationDaoImpl<OrderedDishesPerDayEntity> implements OrderedDishesPerDayDao {

  /**
   * The constructor.
   */
  public OrderedDishesPerDayDaoImpl() {

    super();
  }

  @Override
  public Class<OrderedDishesPerDayEntity> getEntityClass() {

    return OrderedDishesPerDayEntity.class;
  }

  @Override
  public PaginatedListTo<OrderedDishesPerDayEntity> findOrderedDishesPerDay(OrderedDishesSearchCriteriaTo criteria) {

    OrderedDishesPerDayEntity orderedDish = Alias.alias(OrderedDishesPerDayEntity.class);
    EntityPathBase<OrderedDishesPerDayEntity> alias = Alias.$(orderedDish);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    //le,ge,lt,gt,eq,ne
    Timestamp startBookingdate = new Timestamp(
      criteria.getStartBookingdate().getYear(),
      criteria.getStartBookingdate().getMonth(),
      criteria.getStartBookingdate().getDate()-1,
      23,59,59,999);
    if (startBookingdate != null) {
      query.where(Alias.$(orderedDish.getBookingdate()).after(startBookingdate));
    }
    Timestamp endBookingdate = new Timestamp(
      criteria.getEndBookingdate().getYear(),
      criteria.getEndBookingdate().getMonth(),
      criteria.getEndBookingdate().getDate(),
      23,59,59,999);
    if (endBookingdate != null) {
      query.where(Alias.$(orderedDish.getBookingdate()).before(endBookingdate));
    }

    return findPaginated(criteria, query, alias);
  }

}