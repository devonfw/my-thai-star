package com.devonfw.application.mtsj.clustermanagement.common.api;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface ClusterData extends ApplicationEntity {

	public Long getDishId();

	public void setDishId(Long dishId);

	public String getDishName();

	public void setDishName(String dishName);

	public Long getAmount();

	public void setAmount(Long amount);

	public Double getX();

	public void setX(Double x);

	public Double getY();

	public void setY(Double y);

	public String getPolygon();

	public void setPolygon(String polygon);

}
