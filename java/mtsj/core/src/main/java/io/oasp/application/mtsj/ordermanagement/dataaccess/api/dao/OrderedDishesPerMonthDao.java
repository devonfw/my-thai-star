package io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderedDishesPerMonthEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderedDishesSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for OrderedDishesPerMonth entities
 */
public interface OrderedDishesPerMonthDao extends ApplicationDao<OrderedDishesPerMonthEntity> {

  /**
   * Finds the {@link OrderedDishesPerMonthEntity orderedDishesPerMonth} matching the last 12 Months.
   *
   * @return the {@link PaginatedListTo} with the matching {@link OrderedDishesPerMonthEntity} objects.
   */
  PaginatedListTo<OrderedDishesPerMonthEntity> findOrderedDishesPerMonth(OrderedDishesSearchCriteriaTo criteria);
}
