package com.devonfw.application.mtsj.clustermanagement.common.api;

import java.sql.Timestamp;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface ClusterCriteria extends ApplicationEntity {

  public Timestamp getStartBookingdate();

  public void setStartBookingdate(Timestamp startBookingdate);

  public Timestamp getEndBookingdate();

  public void setEndBookingdate(Timestamp endBookingdate);

  public Long getDishId();

  public void setDishId(Long dishId);

  public Integer getClusters();

  public void setClusters(Integer clusters);

}
