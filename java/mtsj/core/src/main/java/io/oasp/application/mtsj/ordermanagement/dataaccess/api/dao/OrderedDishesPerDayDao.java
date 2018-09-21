package io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderedDishesPerDayEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderedDishesSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for OrderedDishesPerDay entities
 */
public interface OrderedDishesPerDayDao extends ApplicationDao<OrderedDishesPerDayEntity> {

  /**
   * Finds the {@link OrderedDishesPerDayEntity orderedDishesPerDay} matching the last seven days.
   *
   * @return the {@link PaginatedListTo} with the matching {@link OrderedDishesPerDayEntity} objects.
   */
  PaginatedListTo<OrderedDishesPerDayEntity> findOrderedDishesPerDay(OrderedDishesSearchCriteriaTo criteria);
}
