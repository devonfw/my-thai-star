package com.devonfw.application.mtsj.imagemanagement.logic.api.to;

import com.devonfw.application.mtsj.imagemanagement.common.api.Image;
import com.devonfw.application.mtsj.imagemanagement.common.api.datatype.ContentType;
import com.devonfw.module.basic.common.api.to.AbstractEto;

/**
 * Entity transport object of Image
 */
public class ImageEto extends AbstractEto implements Image {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ContentType contentType;

  private String mimeType;

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
  public ContentType getContentType() {

    return this.contentType;
  }

  @Override
  public void setContentType(ContentType contentType) {

    this.contentType = contentType;
  }

  @Override
  public String getMimeType() {

    return this.mimeType;
  }

  @Override
  public void setMimeType(String mimeType) {

    this.mimeType = mimeType;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.content == null) ? 0 : this.content.hashCode());
    result = prime * result + ((this.contentType == null) ? 0 : this.contentType.hashCode());
    result = prime * result + ((this.mimeType == null) ? 0 : this.mimeType.hashCode());
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
    if (this.contentType == null) {
      if (other.contentType != null) {
        return false;
      }
    } else if (!this.contentType.equals(other.contentType)) {
      return false;
    }
    if (this.mimeType == null) {
      if (other.mimeType != null) {
        return false;
      }
    } else if (!this.mimeType.equals(other.mimeType)) {
      return false;
    }
    return true;
  }
}
