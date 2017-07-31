package io.oasp.application.mtsj.dishmanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;

import io.oasp.application.mtsj.SpringBootApp;
import io.oasp.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishCto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.test.common.base.ComponentTest;

/**
 * Tests for {@link Dishmanagement} component.
 *
 */
@SpringBootTest(classes = SpringBootApp.class)
public class DishmanagementTest extends ComponentTest {

  @Inject
  private Dishmanagement dishmanagement;

  /**
   * This test gets all the available dishes using an empty SearchCriteria object
   */
  @Test
  public void findAllDishes() {

    DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
    List<CategoryEto> categories = new ArrayList<>();
    criteria.setCategories(categories);
    PaginatedListTo<DishCto> result = this.dishmanagement.findDishCtos(criteria);
    assertThat(result).isNotNull();
  }

  /**
   * This test filters all the available dishes that match the SearchCriteria object
   */
  @Test
  public void filterDishes() {

    DishSearchCriteriaTo criteria = new DishSearchCriteriaTo();
    List<CategoryEto> categories = new ArrayList<>();
    criteria.setCategories(categories);
    criteria.setSearchBy("Garlic Paradise");
    PaginatedListTo<DishCto> result = this.dishmanagement.findDishCtos(criteria);

    assertThat(result).isNotNull();
    assertThat(result.getResult().size()).isGreaterThan(0);
    assertThat(result.getResult().get(0).getDish().getId()).isEqualTo(1L);
  }

}
