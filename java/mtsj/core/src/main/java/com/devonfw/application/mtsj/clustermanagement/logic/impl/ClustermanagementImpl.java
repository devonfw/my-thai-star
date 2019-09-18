package com.devonfw.application.mtsj.clustermanagement.logic.impl;

import java.util.List;

import javax.annotation.security.RolesAllowed;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterCriteriaEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterDataEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataCto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataEto;
import com.devonfw.application.mtsj.clustermanagement.logic.api.Clustermanagement;
import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.application.mtsj.general.logic.base.AbstractComponentFacade;

/**
 * Implementation of component interface of clustermanagement
 */
@Named
@Transactional
public class ClustermanagementImpl extends AbstractComponentFacade implements Clustermanagement {

  private static final Logger LOG = LoggerFactory.getLogger(ClustermanagementImpl.class);

  @PersistenceContext
  private EntityManager entityManager;

  /**
   * The constructor.
   */
  public ClustermanagementImpl() {

    super();
  }

  @Override
  @RolesAllowed(ApplicationAccessControlConfig.PERMISSION_FIND_GEO_CLUSTER)
  public ClustersDataCto getGeoClusters(ClusterCriteriaEto criteria) {

    LOG.debug("Clustering geo data.");

    ClustersDataCto result = new ClustersDataCto();
    ClustersDataEto data = new ClustersDataEto();

    TypedQuery<ClusterDataEto> query = this.entityManager.createNamedQuery("getClusters", ClusterDataEto.class);

    query.setParameter("idDish", criteria.getDishId());
    query.setParameter("startBookingDate", criteria.getStartBookingdate());
    query.setParameter("endBookingDate", criteria.getEndBookingdate());
    query.setParameter("numberOfClusters", criteria.getClusters());

    List<ClusterDataEto> res = query.getResultList();

    data.setData(res);

    result.setClustersData(data);

    return result;
  }

}
