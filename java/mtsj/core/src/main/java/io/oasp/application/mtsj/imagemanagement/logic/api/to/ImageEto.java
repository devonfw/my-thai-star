package io.oasp.application.mtsj.imagemanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.datatype.ImageType;
import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.imagemanagement.common.api.Image;

/**
 * Entity transport object of Image
 */
public class ImageEto extends AbstractEto implements Image {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ImageType imageType;

  private String extension;

  @Override
  public String getName() {

    return this.name;
  }

  @Override
  public void setName(String name) {

    this.name = name;
  }

  @Override
  public String getContent() {

    return this.content;
  }

  @Override
  public void setContent(String content) {

    this.content = content;
  }

  @Override
  public ImageType getImageType() {

    return this.imageType;
  }

  @Override
  public void setImageType(ImageType imageType) {

    this.imageType = imageType;
  }

  @Override
  public String getExtension() {

    return this.extension;
  }

  @Override
  public void setExtension(String extension) {

    this.extension = extension;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.content == null) ? 0 : this.content.hashCode());
    result = prime * result + ((this.imageType == null) ? 0 : this.imageType.hashCode());
    result = prime * result + ((this.extension == null) ? 0 : this.extension.hashCode());
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    // class check will be done by super type EntityTo!
    if (!super.equals(obj)) {
      return false;
    }
    ImageEto other = (ImageEto) obj;
    if (this.name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (!this.name.equals(other.name)) {
      return false;
    }
    if (this.content == null) {
      if (other.content != null) {
        return false;
      }
    } else if (!this.content.equals(other.content)) {
      return false;
    }
    if (this.imageType == null) {
      if (other.imageType != null) {
        return false;
      }
    } else if (!this.imageType.equals(other.imageType)) {
      return false;
    }
    if (this.extension == null) {
      if (other.extension != null) {
        return false;
      }
    } else if (!this.extension.equals(other.extension)) {
      return false;
    }
    return true;
  }
}
