package com.devonfw.application.mtsj.clustermanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterCriteriaEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataCto;
import com.devonfw.application.mtsj.clustermanagement.logic.api.Clustermanagement;
import com.devonfw.application.mtsj.clustermanagement.service.api.rest.ClustermanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Clustermanagement}.
 */
@Named("ClustermanagementRestService")
public class ClustermanagementRestServiceImpl implements ClustermanagementRestService {

  @Inject
  private Clustermanagement clustermanagement;

  @Override
  public ClustersDataCto getGeoClusters(ClusterCriteriaEto criteria) {
    return this.clustermanagement.getGeoClusters( criteria );
  }

}
