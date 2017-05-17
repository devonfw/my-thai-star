package io.oasp.application.mtsj.platemanagement.logic.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.oasp.application.mtsj.general.logic.base.AbstractComponentFacade;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.ImageEntity;
import io.oasp.application.mtsj.imagemanagement.logic.api.Imagemanagement;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.PlateEntity;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.dao.PlateDao;
import io.oasp.application.mtsj.platemanagement.logic.api.Platemanagement;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateEto;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Implementation of component interface of platemanagement
 */
@Named
public class PlatemanagementImpl extends AbstractComponentFacade implements Platemanagement {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(PlatemanagementImpl.class);

  /**
   * @see #getPlateDao()
   */
  @Inject
  private PlateDao plateDao;

  @Inject
  private Imagemanagement imageManagement;

  /**
   * The constructor.
   */
  public PlatemanagementImpl() {

    super();
  }

  @Override
  public PlateEto findPlate(Long id) {

    LOG.debug("Get Plate with id {} from database.", id);
    return getBeanMapper().map(getPlateDao().findOne(id), PlateEto.class);
  }

  @Override
  public PaginatedListTo<PlateEto> findPlateEtos(PlateSearchCriteriaTo criteria) {

    criteria.limitMaximumPageSize(MAXIMUM_HIT_LIMIT);
    PaginatedListTo<PlateEntity> plates = getPlateDao().findPlates(criteria);
    plates = getImage(plates);
    return mapPaginatedEntityList(plates, PlateEto.class);
  }

  @Override
  public boolean deletePlate(Long plateId) {

    PlateEntity plate = getPlateDao().find(plateId);
    getPlateDao().delete(plate);
    LOG.debug("The plate with id '{}' has been deleted.", plateId);
    return true;
  }

  @Override
  public PlateEto savePlate(PlateEto plate) {

    Objects.requireNonNull(plate, "plate");
    PlateEntity plateEntity = getBeanMapper().map(plate, PlateEntity.class);

    // initialize, validate plateEntity here if necessary
    getPlateDao().save(plateEntity);
    LOG.debug("Plate with id '{}' has been created.", plateEntity.getId());

    return getBeanMapper().map(plateEntity, PlateEto.class);
  }

  /**
   * Returns the field 'plateDao'.
   *
   * @return the {@link PlateDao} instance.
   */
  public PlateDao getPlateDao() {

    return this.plateDao;
  }

  /**
   * @param plateDao the {@link PlateDao} to {@link Inject}.
   */
  @Inject
  public void setPlateDao(PlateDao plateDao) {

    this.plateDao = plateDao;
  }

  private PaginatedListTo<PlateEntity> getImage(PaginatedListTo<PlateEntity> entities) {

    List<PlateEntity> platees = entities.getResult();
    List<PlateEntity> plateesImg = new ArrayList<>();
    for (PlateEntity plate : platees) {
      plate.setImage(getBeanMapper().map(this.imageManagement.findImage(plate.getIdImage()), ImageEntity.class));
      plateesImg.add(plate);
    }
    return new PaginatedListTo<>(plateesImg, entities.getPagination());
  }

}
