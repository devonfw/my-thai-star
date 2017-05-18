package io.oasp.application.mtsj.dishmanagement.logic.impl;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.module.beanmapping.common.api.BeanMapper;
import io.oasp.module.test.common.base.ModuleTest;

/**
 * Test class for {@link DishmanagementImpl} using Mockito as fake object provider
 *
 */
public class DishmanagementImplTest extends ModuleTest {

  /**
   * Initializes mocks before each test method.
   */
  @Rule
  public MockitoRule rule = MockitoJUnit.rule();

  /**
   * The System Under Test (SUT)
   */
  private DishmanagementImpl plateManagementImpl;

  @Mock
  private DishDao plateDao;

  @Mock
  private BeanMapper beanMapper;

  /**
   * Injection of the mocked objects into the SUT.
   */
  @Override
  public void doSetUp() {

    super.doSetUp();
    this.plateManagementImpl = new DishmanagementImpl();
    this.plateManagementImpl.setDishDao(this.plateDao);
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

    DishEntity plate = mock(DishEntity.class);
    DishEto eto = new DishEto();
    when(this.plateDao.findOne(1L)).thenReturn(plate);
    when(this.beanMapper.map(plate, DishEto.class)).thenReturn(eto);

    DishEto resultEto = this.plateManagementImpl.findDish(1L);

    assertThat(resultEto).isNotNull();
    assertThat(resultEto).isEqualTo(eto);
  }
}
