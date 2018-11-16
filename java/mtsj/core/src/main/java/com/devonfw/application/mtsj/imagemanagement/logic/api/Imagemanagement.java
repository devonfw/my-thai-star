package com.devonfw.application.mtsj.imagemanagement.logic.api;

import java.util.List;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageEto;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;

/**
 * Interface for Imagemanagement component.
 */
public interface Imagemanagement {

  /**
   * Returns a Image by its id 'id'.
   *
   * @param id The id 'id' of the Image.
   * @return The {@link ImageEto} with id 'id'
   */
  ImageEto findImage(Long id);

  /**
   * Returns a paginated list of Images matching the search criteria.
   *
   * @param criteria the {@link ImageSearchCriteriaTo}.
   * @return the {@link List} of matching {@link ImageEto}s.
   */
  Page<ImageEto> findImageEtos(ImageSearchCriteriaTo criteria);

  /**
   * Deletes a image from the database by its id 'imageId'.
   *
   * @param imageId Id of the image to delete
   * @return boolean <code>true</code> if the image can be deleted, <code>false</code> otherwise
   */
  boolean deleteImage(Long imageId);

  /**
   * Saves a image and store it in the database.
   *
   * @param image the {@link ImageEto} to create.
   * @return the new {@link ImageEto} that has been saved with ID and version.
   */
  ImageEto saveImage(ImageEto image);

}