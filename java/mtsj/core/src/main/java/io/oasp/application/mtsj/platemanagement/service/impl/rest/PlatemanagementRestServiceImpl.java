package io.oasp.application.mtsj.platemanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.platemanagement.logic.api.Platemanagement;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.application.mtsj.platemanagement.service.api.rest.PlatemanagementRestService;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Platemanagement}.
 */
@Named("PlatemanagementRestService")
public class PlatemanagementRestServiceImpl implements PlatemanagementRestService {

  @Inject
  private Platemanagement platemanagement;

  @Override
  public PlateEto getPlate(long id) {

    return this.platemanagement.findPlate(id);
  }

  @Override
  public PlateEto savePlate(PlateEto plate) {

    return this.platemanagement.savePlate(plate);
  }

  @Override
  public void deletePlate(long id) {

    this.platemanagement.deletePlate(id);
  }

  @Override
  public PaginatedListTo<PlateEto> findPlatesByPost(PlateSearchCriteriaTo searchCriteriaTo) {

    return this.platemanagement.findPlateEtos(searchCriteriaTo);
  }

}
