package io.oasp.application.mtsj.platemanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.junit.Test;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;

import io.oasp.application.mtsj.SpringBootApp;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.platemanagement.logic.api.Platemanagement;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.test.common.base.ComponentTest;

/**
 * Tests for {@link Platemanagement} component.
 *
 */
@SpringApplicationConfiguration(classes = SpringBootApp.class)
@WebAppConfiguration
public class PlatemanagementTest extends ComponentTest {

  @Inject
  private Platemanagement platemanagement;

  /**
   * This test gets all the available platees using an empty SearchCriteria object
   */
  @Test
  public void findAllPlates() {

    PlateSearchCriteriaTo criteria = new PlateSearchCriteriaTo();
    List<Category> categories = new ArrayList<>();
    criteria.setCategories(categories);
    PaginatedListTo<PlateEto> result = this.platemanagement.findPlateEtos(criteria);
    assertThat(result).isNotNull();
  }

  /**
   * This test filters all the available platees that match the SearchCriteria object
   */
  @Test
  public void filterPlates() {

    PlateSearchCriteriaTo criteria = new PlateSearchCriteriaTo();
    List<Category> categories = new ArrayList<>();
    criteria.setCategories(categories);
    criteria.setSearchBy("Garlic Paradise");
    PaginatedListTo<PlateEto> result = this.platemanagement.findPlateEtos(criteria);

    assertThat(result).isNotNull();
    assertThat(result.getResult().size()).isGreaterThan(0);
    assertThat(result.getResult().get(0).getId()).isEqualTo(1L);
  }

}
