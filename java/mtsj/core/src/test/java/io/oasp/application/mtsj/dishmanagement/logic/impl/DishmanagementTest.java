package io.oasp.application.mtsj.dishmanagement.logic.impl;

import javax.inject.Inject;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import io.oasp.application.mtsj.SpringBootApp;
import io.oasp.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import io.oasp.module.test.common.base.ComponentTest;

/**
 * Tests for {@link Dishmanagement} component.
 *
 */
@SpringApplicationConfiguration(classes = SpringBootApp.class)
@WebAppConfiguration
public class DishmanagementTest extends ComponentTest {

  @Inject
  private Dishmanagement platemanagement;

  /**
   * This test gets all the available platees using an empty SearchCriteria object
   */
  // @Test
  // public void findAllPlates() {
  //
  // DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
  // List<CategoryEntity> categories = new ArrayList<>();
  // criteria.setCategories(categories);
  // PaginatedListTo<DishEto> result = this.platemanagement.findDishEtos(criteria);
  // assertThat(result).isNotNull();
  // }
  //
  // /**
  // * This test filters all the available platees that match the SearchCriteria object
  // */
  // @Test
  // public void filterPlates() {
  //
  // DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
  // List<CategoryEntity> categories = new ArrayList<>();
  // criteria.setCategories(categories);
  // criteria.setSearchBy("Garlic Paradise");
  // PaginatedListTo<DishEto> result = this.platemanagement.findDishEtos(criteria);
  //
  // assertThat(result).isNotNull();
  // assertThat(result.getResult().size()).isGreaterThan(0);
  // assertThat(result.getResult().get(0).getId()).isEqualTo(1L);
  // }

}
