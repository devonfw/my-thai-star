package io.oasp.application.mtsj.ordermanagement.logic.impl;

import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderDishExtraIngredientEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderDishExtraIngredientDao;
import io.oasp.application.mtsj.ordermanagement.dataaccess.api.dao.OrderLineDao;
import io.oasp.application.mtsj.ordermanagement.logic.api.Ordermanagement;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderDishExtraIngredientSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineEto;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import io.oasp.application.mtsj.ordermanagement.logic.api.to.OrderSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of ordermanagement
 */
@Named
@Transactional
public class OrdermanagementImpl extends AbstractComponentFacade implements Ordermanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(OrdermanagementImpl.class);

  /**
   * @see #getOrderDishExtraIngredientDao()
   */
  @Inject
  private OrderDishExtraIngredientDao orderDishExtraIngredientDao;

  /**
   * @see #getOrderDao()
   */
  @Inject
  private OrderDao orderDao;

  /**
   * @see #getOrderLineDao()
   */
  @Inject
  private OrderLineDao orderLineDao;

  /**
   * The constructor.
   */
  public OrdermanagementImpl() {

    super();
  }

  @Override
  public OrderDishExtraIngredientEto findOrderDishExtraIngredient(Long id) {

    LOG.debug("Get OrderDishExtraIngredient with id {} from database.", id);
    return getBeanMapper().map(getOrderDishExtraIngredientDao().findOne(id), OrderDishExtraIngredientEto.class);
  }

  @Override
  public PaginatedListTo<OrderDishExtraIngredientEto> findOrderDishExtraIngredientEtos(
      OrderDishExtraIngredientSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<OrderDishExtraIngredientEntity> orderdishextraingredients =
        getOrderDishExtraIngredientDao().findOrderDishExtraIngredients(criteria);
    return mapPaginatedEntityList(orderdishextraingredients, OrderDishExtraIngredientEto.class);
  }

  @Override
  public boolean deleteOrderDishExtraIngredient(Long orderDishExtraIngredientId) {

    OrderDishExtraIngredientEntity orderDishExtraIngredient =
        getOrderDishExtraIngredientDao().find(orderDishExtraIngredientId);
    getOrderDishExtraIngredientDao().delete(orderDishExtraIngredient);
    LOG.debug("The orderDishExtraIngredient with id '{}' has been deleted.", orderDishExtraIngredientId);
    return true;
  }

  @Override
  public OrderDishExtraIngredientEto saveOrderDishExtraIngredient(
      OrderDishExtraIngredientEto orderDishExtraIngredient) {

    Objects.requireNonNull(orderDishExtraIngredient, "orderDishExtraIngredient");
    OrderDishExtraIngredientEntity orderDishExtraIngredientEntity =
        getBeanMapper().map(orderDishExtraIngredient, OrderDishExtraIngredientEntity.class);

    // initialize, validate orderDishExtraIngredientEntity here if necessary
    OrderDishExtraIngredientEntity resultEntity = getOrderDishExtraIngredientDao().save(orderDishExtraIngredientEntity);
    LOG.debug("OrderDishExtraIngredient with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, OrderDishExtraIngredientEto.class);
  }

  /**
   * Returns the field 'orderDishExtraIngredientDao'.
   *
   * @return the {@link OrderDishExtraIngredientDao} instance.
   */
  public OrderDishExtraIngredientDao getOrderDishExtraIngredientDao() {

    return this.orderDishExtraIngredientDao;
  }

  @Override
  public OrderEto findOrder(Long id) {

    LOG.debug("Get Order with id {} from database.", id);
    return getBeanMapper().map(getOrderDao().findOne(id), OrderEto.class);
  }

  @Override
  public PaginatedListTo<OrderEto> findOrderEtos(OrderSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<OrderEntity> orders = getOrderDao().findOrders(criteria);
    return mapPaginatedEntityList(orders, OrderEto.class);
  }

  @Override
  public boolean deleteOrder(Long orderId) {

    OrderEntity order = getOrderDao().find(orderId);
    getOrderDao().delete(order);
    LOG.debug("The order with id '{}' has been deleted.", orderId);
    return true;
  }

  @Override
  public OrderEto saveOrder(OrderEto order) {

    Objects.requireNonNull(order, "order");
    OrderEntity orderEntity = getBeanMapper().map(order, OrderEntity.class);

    // initialize, validate orderEntity here if necessary
    OrderEntity resultEntity = getOrderDao().save(orderEntity);
    LOG.debug("Order with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, OrderEto.class);
  }

  /**
   * Returns the field 'orderDao'.
   *
   * @return the {@link OrderDao} instance.
   */
  public OrderDao getOrderDao() {

    return this.orderDao;
  }

  @Override
  public OrderLineEto findOrderLine(Long id) {

    LOG.debug("Get OrderLine with id {} from database.", id);
    return getBeanMapper().map(getOrderLineDao().findOne(id), OrderLineEto.class);
  }

  @Override
  public PaginatedListTo<OrderLineEto> findOrderLineEtos(OrderLineSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<OrderLineEntity> orderlines = getOrderLineDao().findOrderLines(criteria);
    return mapPaginatedEntityList(orderlines, OrderLineEto.class);
  }

  @Override
  public boolean deleteOrderLine(Long orderLineId) {

    OrderLineEntity orderLine = getOrderLineDao().find(orderLineId);
    getOrderLineDao().delete(orderLine);
    LOG.debug("The orderLine with id '{}' has been deleted.", orderLineId);
    return true;
  }

  @Override
  public OrderLineEto saveOrderLine(OrderLineEto orderLine) {

    Objects.requireNonNull(orderLine, "orderLine");
    OrderLineEntity orderLineEntity = getBeanMapper().map(orderLine, OrderLineEntity.class);

    // initialize, validate orderLineEntity here if necessary
    OrderLineEntity resultEntity = getOrderLineDao().save(orderLineEntity);
    LOG.debug("OrderLine with id '{}' has been created.", resultEntity.getId());

    return getBeanMapper().map(resultEntity, OrderLineEto.class);
  }

  /**
   * Returns the field 'orderLineDao'.
   *
   * @return the {@link OrderLineDao} instance.
   */
  public OrderLineDao getOrderLineDao() {

    return this.orderLineDao;
  }

}
