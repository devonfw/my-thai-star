package io.oasp.application.mtsj.imagemanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.datatype.ImageType;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.imagemanagement.common.api.Image}s.
 *
 */
public class ImageSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ImageType imageType;

  private String extension;

  /**
   * The constructor.
   */
  public ImageSearchCriteriaTo() {

    super();
  }

  public String getName() {

    return this.name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public String getContent() {

    return this.content;
  }

  public void setContent(String content) {

    this.content = content;
  }

  public ImageType getImageType() {

    return this.imageType;
  }

  public void setImageType(ImageType imageType) {

    this.imageType = imageType;
  }

  public String getExtension() {

    return this.extension;
  }

  public void setExtension(String extension) {

    this.extension = extension;
  }

}
