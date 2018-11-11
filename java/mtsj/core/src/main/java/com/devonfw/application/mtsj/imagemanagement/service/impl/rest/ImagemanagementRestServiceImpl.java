package com.devonfw.application.mtsj.imagemanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.imagemanagement.logic.api.Imagemanagement;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageEto;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;
import com.devonfw.application.mtsj.imagemanagement.service.api.rest.ImagemanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Imagemanagement}.
 */
@Named("ImagemanagementRestService")
public class ImagemanagementRestServiceImpl implements ImagemanagementRestService {

  @Inject
  private Imagemanagement imagemanagement;

  @Override
  public ImageEto getImage(long id) {

    return this.imagemanagement.findImage(id);
  }

  @Override
  public ImageEto saveImage(ImageEto image) {

    return this.imagemanagement.saveImage(image);
  }

  @Override
  public void deleteImage(long id) {

    this.imagemanagement.deleteImage(id);
  }

  @Override
  public Page<ImageEto> findImagesByPost(ImageSearchCriteriaTo searchCriteriaTo) {

    return this.imagemanagement.findImageEtos(searchCriteriaTo);
  }

}