package io.oasp.application.mtsj.imagemanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.imagemanagement.common.api.Image;
import io.oasp.application.mtsj.imagemanagement.common.api.datatype.ContentType;

/**
 * @author pparrado
 */
@Entity
@Table(name = "Image")
public class ImageEntity extends ApplicationPersistenceEntity implements Image {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ContentType contentType;

  private String mimeType;

  /**
   * @return name
   */
  public String getName() {

    return this.name;
  }

  /**
   * @param name new value of {@link #getName}.
   */
  public void setName(String name) {

    this.name = name;
  }

  /**
   * @return content
   */
  public String getContent() {

    return this.content;
  }

  /**
   * @param content new value of {@link #getContent}.
   */
  public void setContent(String content) {

    this.content = content;
  }

  /**
   * @return contentType
   */
  public ContentType getContentType() {

    return this.contentType;
  }

  /**
   * @param contentType new value of {@link #getContentType}.
   */
  public void setContentType(ContentType contentType) {

    this.contentType = contentType;
  }

  /**
   * @return mimeType
   */
  public String getMimeType() {

    return this.mimeType;
  }

  /**
   * @param mimeType new value of {@link #getMimeType}.
   */
  public void setMimeType(String mimeType) {

    this.mimeType = mimeType;
  }

}
