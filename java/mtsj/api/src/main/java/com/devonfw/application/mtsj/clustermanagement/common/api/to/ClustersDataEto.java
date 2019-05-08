package com.devonfw.application.mtsj.clustermanagement.common.api.to;

import java.util.ArrayList;
import java.util.List;

import com.devonfw.application.mtsj.clustermanagement.common.api.ClusterData;
import com.devonfw.application.mtsj.clustermanagement.common.api.ClustersData;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of ClusterData
 */
public class ClustersDataEto extends AbstractEto implements ClustersData {

  private static final long serialVersionUID = 1L;

  private List<ClusterData> data;

  @Override
  public List<ClusterData> getData() {

    return data;
  }

  @Override
  public void setData(List<? extends ClusterData> data) {

    if ( this.data == null ) {
      this.data = new ArrayList<>();
    }
    this.data.addAll( data );
  }

}
