package com.devonfw.application.mtsj.clustermanagement.logic.impl;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

import java.sql.Timestamp;
import java.util.Collections;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Profile;
import org.springframework.security.test.context.support.ReactorContextTestExecutionListener;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContextTestExecutionListener;
import org.springframework.test.context.TestExecutionListeners;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.clustermanagement.common.api.ClusterData;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterCriteriaEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClusterDataEto;
import com.devonfw.application.mtsj.clustermanagement.common.api.to.ClustersDataCto;
import com.devonfw.application.mtsj.clustermanagement.logic.api.Clustermanagement;
import com.devonfw.application.mtsj.general.common.api.constants.Roles;
import com.devonfw.module.test.common.base.ComponentTest;

/**
 * Test for {@link Clustermanagement}
 */
// @SpringBootTest(classes = { SpringBootApp.class, ClustermanagementTest.TestConfig.class })
@Profile("hana")

@TestExecutionListeners(listeners = { WithSecurityContextTestExecutionListener.class,
ReactorContextTestExecutionListener.class })

@SpringBootTest(classes = SpringBootApp.class)
// @RunWith(MockitoJUnitRunner.class)
@ExtendWith(MockitoExtension.class)
public class ClustermanagementTest extends ComponentTest {

  @InjectMocks
  private Clustermanagement clusterManagement = new ClustermanagementImpl();

  @Mock
  private EntityManager entityManager;

  @Mock
  private TypedQuery<ClusterDataEto> mockedTypedQuery;

  static ClusterDataEto clusterData;

  /**
   * Creation of needed objects
   */
  @Override
  public void doSetUp() {

    clusterData = new ClusterDataEto();
    clusterData.setId(Long.valueOf(1));
    clusterData.setDishId(Long.valueOf(1));
    clusterData.setDishName("Dish 1");
    clusterData.setX(Double.valueOf(12.345));
    clusterData.setY(Double.valueOf(67.89));
  }

  /**
   * Tests the clustering
   */
  @Test
  @WithMockUser(username = "manager", authorities = { Roles.MANAGER })
  public void getGeoClusters() {

    ClusterCriteriaEto eto = new ClusterCriteriaEto();
    eto.setStartBookingdate(new Timestamp(System.currentTimeMillis() - 24 * 60 * 60 * 1000));
    eto.setEndBookingdate(new Timestamp(System.currentTimeMillis()));
    eto.setDishId(Long.valueOf(1));
    eto.setClusters(4);

    when(this.entityManager.createNamedQuery(any(), eq(ClusterDataEto.class))).thenReturn(this.mockedTypedQuery);
    when(this.mockedTypedQuery.getResultList()).thenReturn(returnClusterData());

    ClustersDataCto clusters = this.clusterManagement.getGeoClusters(eto);
    assertThat(clusters).isNotNull();
    assertThat(clusters.getClustersData()).isNotNull();
    assertThat(clusters.getClustersData().getData()).isNotNull();
    assertThat(clusters.getClustersData().getData().size()).isEqualTo(1);

    ClusterData expected = new ClusterDataEto();
    expected.setDishName(clusterData.getDishName());
    expected.setAmount(clusterData.getAmount());
    expected.setId(clusterData.getId());
    expected.setModificationCounter(clusterData.getModificationCounter());
    expected.setDishId(clusterData.getDishId());
    expected.setX(clusterData.getX());
    expected.setY(clusterData.getY());
    assertThat(clusters.getClustersData().getData().get(0)).isEqualToComparingFieldByField(expected);
  }

  private List<ClusterDataEto> returnClusterData() {

    ClusterDataEto data = new ClusterDataEto();
    data.setId(Long.valueOf(1));
    data.setDishId(Long.valueOf(1));
    data.setDishName("Dish 1");
    data.setX(12.345);
    data.setY(67.89);
    return Collections.singletonList(data);
  }

}
