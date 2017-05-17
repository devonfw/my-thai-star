package io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for OrderLine entities
 */
public interface OrderLineDao extends ApplicationDao<OrderLineEntity> {

  /**
   * Finds the {@link OrderLineEntity orderlines} matching the given {@link OrderLineSearchCriteriaTo}.
   *
   * @param criteria is the {@link OrderLineSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link OrderLineEntity} objects.
   */
  PaginatedListTo<OrderLineEntity> findOrderLines(OrderLineSearchCriteriaTo criteria);
}
