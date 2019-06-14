package com.devonfw.application.mtsj.clustermanagement.common.api;

import java.util.List;

import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;

public interface ClustersData extends ApplicationEntity {

  public List<ClusterData> getData();

  public void setData(List<? extends ClusterData> data);

}
