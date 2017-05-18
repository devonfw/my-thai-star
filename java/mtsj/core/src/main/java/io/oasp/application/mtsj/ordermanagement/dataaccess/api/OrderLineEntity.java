package io.oasp.application.mtsj.ordermanagement.dataaccess.api;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.ordermanagement.common.api.OrderLine;

/**
 * Entity for OrderLine objects to manage each one of the lines of an order.
 */
@Entity
@Table(name = "OrderLine")
public class OrderLineEntity extends ApplicationPersistenceEntity implements OrderLine {

  private OrderEntity order;

  private Long idDish;

  private List<Ingredient> extras;

  private int amount;

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
   * @return idDish
   */
  public Long getIdDish() {

    return this.idDish;
  }

  /**
   * @param idDish new value of {@link #getIdDish}.
   */
  public void setIdDish(Long idDish) {

    this.idDish = idDish;
  }

  /**
   * @return extras
   */
  @ManyToMany(fetch = FetchType.EAGER)
  @Column(name = "idIngredient")
  @JoinTable(name = "OrderDishExtraIngredient", joinColumns = {
  @javax.persistence.JoinColumn(name = "idOrderLine") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idIngredient"))
  public List<Ingredient> getExtras() {

    return this.extras;
  }

  /**
   * @param extras new value of {@link #getExtras}.
   */
  public void setExtras(List<Ingredient> extras) {

    this.extras = extras;
  }

  /**
   * @return amount
   */
  public int getAmount() {

    return this.amount;
  }

  /**
   * @param amount new value of {@link #getAmount}.
   */
  public void setAmount(int amount) {

    this.amount = amount;
  }

  /**
   * @return comment
   */
  public String getComment() {

    return this.comment;
  }

  /**
   * @param comment new value of {@link #getComment}.
   */
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

}
