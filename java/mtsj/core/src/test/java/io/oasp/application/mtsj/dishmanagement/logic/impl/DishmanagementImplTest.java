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
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishCto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.IngredientEto;
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
  private DishmanagementImpl dishManagementImpl;

  @Mock
  private DishDao dishDao;

  @Mock
  private BeanMapper beanMapper;

  /**
   * Injection of the mocked objects into the SUT.
   */
  @Override
  public void doSetUp() {

    super.doSetUp();
    this.dishManagementImpl = new DishmanagementImpl();
    // this.dishManagementImpl.setDishDao(this.dishDao);
    this.dishManagementImpl.setBeanMapper(this.beanMapper);
  }

  /**
   * Delete the used mocks.
   */
  @Override
  public void doTearDown() {

    super.doTearDown();

    this.beanMapper = null;
    this.dishDao = null;
    this.dishManagementImpl = null;
  }

  /**
   * Test for findPlate method
   */
  @Test
  public void findDish() {

    DishEntity dish = mock(DishEntity.class);
    DishCto cto = new DishCto();
    cto.setDish(this.beanMapper.map(dish, DishEto.class));
    cto.setCategories(this.beanMapper.mapList(dish.getCategories(), CategoryEto.class));
    cto.setExtras(this.beanMapper.mapList(dish.getExtras(), IngredientEto.class));
    when(this.dishDao.findOne(1L)).thenReturn(dish);
    when(this.beanMapper.map(dish, DishCto.class)).thenReturn(cto);

    DishCto resultCto = this.dishManagementImpl.findDish(1L);

    assertThat(resultCto).isNotNull();
    assertThat(resultCto).isEqualTo(cto);
  }
}
