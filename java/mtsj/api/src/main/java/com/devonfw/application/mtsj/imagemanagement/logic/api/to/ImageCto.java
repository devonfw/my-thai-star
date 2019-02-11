package com.devonfw.application.mtsj.imagemanagement.logic.api.to;

import com.devonfw.module.basic.common.api.to.AbstractCto;

/**
 * Composite transport object of Image
 */
public class ImageCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private ImageEto image;

  /**
   * @return image
   */
  public ImageEto getImage() {

    return this.image;
  }

  /**
   * @param image the image to set
   */
  public void setImage(ImageEto image) {

    this.image = image;
  }

}
