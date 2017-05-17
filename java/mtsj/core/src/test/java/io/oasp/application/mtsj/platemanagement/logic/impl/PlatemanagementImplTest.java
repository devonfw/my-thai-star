package io.oasp.application.mtsj.platemanagement.logic.impl;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import io.oasp.application.mtsj.platemanagement.dataaccess.api.PlateEntity;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.dao.PlateDao;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.impl.PlatemanagementImpl;
import io.oasp.module.beanmapping.common.api.BeanMapper;
import io.oasp.module.test.common.base.ModuleTest;

/**
 * Test class for {@link PlatemanagementImpl} using Mockito as fake object provider
 *
 */
public class PlatemanagementImplTest extends ModuleTest {

  /**
   * Initializes mocks before each test method.
   */
  @Rule
  public MockitoRule rule = MockitoJUnit.rule();

  /**
   * The System Under Test (SUT)
   */
  private PlatemanagementImpl plateManagementImpl;

  @Mock
  private PlateDao plateDao;

  @Mock
  private BeanMapper beanMapper;

  /**
   * Injection of the mocked objects into the SUT.
   */
  @Override
  public void doSetUp() {

    super.doSetUp();
    this.plateManagementImpl = new PlatemanagementImpl();
    this.plateManagementImpl.setPlateDao(this.plateDao);
    this.plateManagementImpl.setBeanMapper(this.beanMapper);
  }

  /**
   * Delete the used mocks.
   */
  @Override
  public void doTearDown() {

    super.doTearDown();

    this.beanMapper = null;
    this.plateDao = null;
    this.plateManagementImpl = null;
  }

  /**
   * Test for findPlate method
   */
  @Test
  public void findPlate() {

    PlateEntity plate = mock(PlateEntity.class);
    PlateEto eto = new PlateEto();
    when(this.plateDao.findOne(1L)).thenReturn(plate);
    when(this.beanMapper.map(plate, PlateEto.class)).thenReturn(eto);

    PlateEto resultEto = this.plateManagementImpl.findPlate(1L);

    assertThat(resultEto).isNotNull();
    assertThat(resultEto).isEqualTo(eto);
  }
}
