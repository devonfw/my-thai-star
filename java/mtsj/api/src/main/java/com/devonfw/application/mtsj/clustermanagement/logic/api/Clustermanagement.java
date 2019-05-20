package com.devonfw.application.mtsj.clustermanagement.logic.api;

import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterCriteriaEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataCto;

/**
 * Interface for Clustermanagement component.
 */
public interface Clustermanagement {

  ClustersDataCto getGeoClusters(ClusterCriteriaEto criteria);

}
