package com.devonfw.application.mtsj.imagemanagement.service.api.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.imagemanagement.logic.api.Imagemanagement;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageEto;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;

/**
 * The service interface for REST calls in order to execute the logic of component {@link Imagemanagement}.
 */
@Path("/imagemanagement/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public interface ImagemanagementRestService {

  /**
   * Delegates to {@link Imagemanagement#findImage}.
   *
   * @param id the ID of the {@link ImageEto}
   * @return the {@link ImageEto}
   */
  @GET
  @Path("/image/{id}/")
  public ImageEto getImage(@PathParam("id") long id);

  /**
   * Delegates to {@link Imagemanagement#saveImage}.
   *
   * @param image the {@link ImageEto} to be saved
   * @return the recently created {@link ImageEto}
   */
  @POST
  @Path("/image/")
  public ImageEto saveImage(ImageEto image);

  /**
   * Delegates to {@link Imagemanagement#deleteImage}.
   *
   * @param id ID of the {@link ImageEto} to be deleted
   */
  @DELETE
  @Path("/image/{id}/")
  public void deleteImage(@PathParam("id") long id);

  /**
   * Delegates to {@link Imagemanagement#findImageEtos}.
   *
   * @param searchCriteriaTo the pagination and search criteria to be used for finding images.
   * @return the {@link PaginatedListTo list} of matching {@link ImageEto}s.
   */
  @Path("/image/search")
  @POST
  public Page<ImageEto> findImagesByPost(ImageSearchCriteriaTo searchCriteriaTo);

}