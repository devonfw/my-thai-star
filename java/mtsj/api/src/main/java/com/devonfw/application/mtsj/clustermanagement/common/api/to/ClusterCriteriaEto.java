package com.devonfw.application.mtsj.clustermanagement.common.api.to;

import java.sql.Timestamp;

import com.devonfw.application.mtsj.clustermanagement.common.api.ClusterCriteria;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of ClusterCriteria
 */
public class ClusterCriteriaEto extends AbstractEto implements ClusterCriteria {

  private static final long serialVersionUID = 1L;

  private Integer clusters;
  private Timestamp startBookingdate;
  private Timestamp endBookingdate;
  private Long dishId;

  @Override
  public Timestamp getStartBookingdate() {

    return startBookingdate;
  }

  @Override
  public void setStartBookingdate(Timestamp startBookingdate) {

    this.startBookingdate = startBookingdate;
  }

  @Override
  public Timestamp getEndBookingdate() {

    return endBookingdate;
  }

  @Override
  public void setEndBookingdate(Timestamp endBookingdate) {

    this.endBookingdate = endBookingdate;
  }

  @Override
  public Long getDishId() {

    return dishId;
  }

  @Override
  public void setDishId(Long dishId) {

    this.dishId = dishId;
  }

  @Override
  public Integer getClusters() {

    return clusters;
  }

  @Override
  public void setClusters(Integer clusters) {

    this.clusters = clusters;
  }

}
