package io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for Order entities
 */
public interface OrderDao extends ApplicationDao<OrderEntity> {

  /**
   * Finds the {@link OrderEntity orders} matching the given {@link OrderSearchCriteriaTo}.
   *
   * @param criteria is the {@link OrderSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link OrderEntity} objects.
   */
  PaginatedListTo<OrderEntity> findOrders(OrderSearchCriteriaTo criteria);

}
