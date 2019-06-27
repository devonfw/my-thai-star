package com.devonfw.application.mtsj.clustermanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterCriteriaEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataCto;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Clustermanagement}.
 */
@Path("/clustermanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ClustermanagementRestService {

  /**
   * Delegates to {@link Clustermanagement#getGeoClusters}.
   *
   * @return the {@link ClustersDataCto}
   */
  @POST
  @Path("/geoclusters/")
  public ClustersDataCto getGeoClusters(ClusterCriteriaEto criteria);
}
