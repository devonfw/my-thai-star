package io.oasp.application.mtsj.dishmanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.dishmanagement.logic.api.Dishmanagement;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishEto;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.dishmanagement.service.api.rest.DishmanagementRestService;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Dishmanagement}.
 */
@Named("DishmanagementRestService")
public class DishmanagementRestServiceImpl implements DishmanagementRestService {

  @Inject
  private Dishmanagement dishmanagement;

  @Override
  public DishEto getDish(long id) {

    return this.dishmanagement.findDish(id);
  }

  @Override
  public DishEto saveDish(DishEto dish) {

    return this.dishmanagement.saveDish(dish);
  }

  @Override
  public void deleteDish(long id) {

    this.dishmanagement.deleteDish(id);
  }

  @Override
  public PaginatedListTo<DishEto> findDishsByPost(DishSearchCriteriaTo searchCriteriaTo) {

    return this.dishmanagement.findDishEtos(searchCriteriaTo);
  }

}
