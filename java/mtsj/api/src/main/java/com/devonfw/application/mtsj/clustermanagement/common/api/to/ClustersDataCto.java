package com.devonfw.application.mtsj.clustermanagement.common.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of ClusterData
 */
public class ClustersDataCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ClustersDataEto clustersData;

  public ClustersDataEto getClustersData() {

    return this.clustersData;
  }

  public void setClustersData(ClustersDataEto clustersData) {

    this.clustersData = clustersData;
  }

}
