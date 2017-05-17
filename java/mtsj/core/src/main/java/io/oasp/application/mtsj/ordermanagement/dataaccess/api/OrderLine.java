package io.oasp.application.mtsj.ordermanagement.dataaccess.api;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Ingredient;

/**
 * Entity for OrderLine objects to manage each one of the lines of an order.
 *
 */
@Entity
@Table(name = "OrderLine")
public class OrderLine {

  private Long idOrder;

  private Long idDish;

  private List<Ingredient> extras;

  private int amount;

  private String comment;

}
