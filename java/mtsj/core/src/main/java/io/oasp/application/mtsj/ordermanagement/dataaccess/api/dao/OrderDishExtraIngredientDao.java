package io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderDishExtraIngredientEntity;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for OrderDishExtraIngredient entities
 */
public interface OrderDishExtraIngredientDao extends ApplicationDao<OrderDishExtraIngredientEntity> {

  /**
   * Finds the {@link OrderDishExtraIngredientEntity orderdishextraingredients} matching the given
   * {@link OrderDishExtraIngredientSearchCriteriaTo}.
   *
   * @param criteria is the {@link OrderDishExtraIngredientSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link OrderDishExtraIngredientEntity} objects.
   */
  PaginatedListTo<OrderDishExtraIngredientEntity> findOrderDishExtraIngredients(
      OrderDishExtraIngredientSearchCriteriaTo criteria);
}
