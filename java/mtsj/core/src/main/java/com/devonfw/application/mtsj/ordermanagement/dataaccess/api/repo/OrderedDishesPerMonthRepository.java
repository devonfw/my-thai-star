package com.devonfw.application.mtsj.ordermanagement.dataaccess.api.repo;

import java.sql.Timestamp;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.ordermanagement.common.api.to.OrderedDishesSearchCriteriaTo;
import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderedDishesPerMonthEntity;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * Data access interface for OrderedDishesPerMonth entities
 */
public interface OrderedDishesPerMonthRepository extends DefaultRepository<OrderedDishesPerMonthEntity> {

  /**
   * Finds the {@link OrderedDishesPerMonthEntity orderedDishesPerMonth} matching the last 12 Months.
   *
   * @return the {@link PaginatedListTo} with the matching {@link OrderedDishesPerMonthEntity} objects.
   */
  default Page<OrderedDishesPerMonthEntity> findOrderedDishesPerMonth(OrderedDishesSearchCriteriaTo criteria) {

    OrderedDishesPerMonthEntity orderedDish = newDslAlias();
    JPAQuery<OrderedDishesPerMonthEntity> query = newDslQuery(orderedDish);

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

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }
}
