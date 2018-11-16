package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.OrderLine;

/**
 * {@link ApplicationPersistenceEntity Entity} that represents a single {@link OrderLine} of an {@link OrderEntity}.
 */
@Entity
@Table(name = "OrderLine")
public class OrderLineEntity extends ApplicationPersistenceEntity implements OrderLine {

  private OrderEntity order;

  private DishEntity dish;

  private List<IngredientEntity> extras;

  private Integer amount;

  private String comment;

  private static final long serialVersionUID = 1L;

  /**
   * @return order
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idOrder")
  public OrderEntity getOrder() {

    return this.order;
  }

  /**
   * @param order new value of {@link #getOrder}.
   */
  public void setOrder(OrderEntity order) {

    this.order = order;
  }

  /**
   * @return extras
   */
  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "OrderDishExtraIngredient", joinColumns = {
  @javax.persistence.JoinColumn(name = "idOrderLine") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idIngredient"))
  public List<IngredientEntity> getExtras() {

    return this.extras;
  }

  /**
   * @param extras new value of {@link #getExtras}.
   */
  public void setExtras(List<IngredientEntity> extras) {

    this.extras = extras;
  }

  /**
   * @return amount
   */
  @Override
  public Integer getAmount() {

    return this.amount;
  }

  /**
   * @param amount new value of {@link #getAmount}.
   */
  @Override
  public void setAmount(Integer amount) {

    this.amount = amount;
  }

  /**
   * @return comment
   */
  @Override
  public String getComment() {

    return this.comment;
  }

  /**
   * @param comment new value of {@link #getComment}.
   */
  @Override
  public void setComment(String comment) {

    this.comment = comment;
  }

  @Override
  @Transient
  public Long getOrderId() {

    if (this.order == null) {
      return null;
    }
    return this.order.getId();
  }

  @Override
  public void setOrderId(Long orderId) {

    if (orderId == null) {
      this.order = null;
    } else {
      OrderEntity orderEntity = new OrderEntity();
      orderEntity.setId(orderId);
      this.order = orderEntity;
    }
  }

  @Override
  @Transient
  public Long getDishId() {

    if (this.dish == null) {
      return null;
    }
    return this.dish.getId();
  }

  @Override
  public void setDishId(Long dishId) {

    if (dishId == null) {
      this.dish = null;
    } else {
      DishEntity dishEntity = new DishEntity();
      dishEntity.setId(dishId);
      this.dish = dishEntity;
    }
  }

  /**
   * @return dish
   */
  @OneToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idDish")
  public DishEntity getDish() {

    return this.dish;
  }

  /**
   * @param dish new value of {@link #getDish}.
   */
  public void setDish(DishEntity dish) {

    this.dish = dish;
  }

}
