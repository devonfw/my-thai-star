package com.devonfw.application.mtsj.dishmanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

import com.devonfw.application.mtsj.SpringBootApp;
import com.devonfw.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategoryEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishCto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import com.devonfw.module.test.common.base.ComponentTest;

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
    PageRequest pageable = new PageRequest(0, 100, new Sort(Direction.DESC, "price"));
    criteria.setPageable(pageable);
    Page<DishCto> result = this.dishmanagement.findDishCtos(criteria);
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
    PageRequest pageable = new PageRequest(0, 100, new Sort(Direction.DESC, "price"));
    criteria.setPageable(pageable);
    Page<DishCto> result = this.dishmanagement.findDishCtos(criteria);

    assertThat(result).isNotNull();
    assertThat(result.getContent().size()).isGreaterThan(0);
    assertThat(result.getContent().get(0).getDish().getId()).isEqualTo(1L);
  }

}
