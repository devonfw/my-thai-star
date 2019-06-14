package com.devonfw.application.mtsj.clustermanagement.common.api.to;

import com.devonfw.application.mtsj.clustermanagement.common.api.ClusterData;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of ClusterData
 * 
 * @see {@link PredictionDayDataEntity} for query definitions related to this class. The query definitions need to be on
 * a managed entity for JPA to pick them up.
 */
public class ClusterDataEto extends AbstractEto implements ClusterData {

  private static final long serialVersionUID = 1L;

  private Long dishId;
  private String dishName;
  private Long amount;
  private Double x;
  private Double y;
  private String polygon;

  public ClusterDataEto() {
  }

  public ClusterDataEto(Long id, Integer modificationCounter, Long idDish, String dishName, Long amount, Double x, Double y, String polygon) {
    this.setId( id );
    this.setModificationCounter( modificationCounter );
    this.dishId = idDish;
    this.dishName = dishName;
    this.amount = amount;
    this.x = x;
    this.y = y;
    this.polygon = polygon;
  }

  @Override
  public Long getDishId() {

    return this.dishId;
  }

  @Override
  public void setDishId(Long dishId) {

    this.dishId = dishId;
  }

  @Override
  public String getDishName() {

    return this.dishName;
  }

  @Override
  public void setDishName(String dishName) {

    this.dishName = dishName;
  }

  @Override
  public Long getAmount() {

    return this.amount;
  }

  @Override
  public void setAmount(Long amount) {

    this.amount = amount;
  }

  @Override
  public Double getX() {

    return this.x;
  }

  @Override
  public void setX(Double x) {

    this.x = x;
  }

  @Override
  public Double getY() {

    return this.y;
  }

  @Override
  public void setY(Double y) {

    this.y = y;
  }

  @Override
  public String getPolygon() {

    return this.polygon;
  }

  @Override
  public void setPolygon(String polygon) {

    this.polygon = polygon;
  }

}
