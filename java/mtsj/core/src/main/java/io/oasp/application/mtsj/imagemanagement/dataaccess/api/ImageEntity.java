package io.oasp.application.mtsj.imagemanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import io.oasp.application.mtsj.general.common.api.datatype.ImageType;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.imagemanagement.common.api.Image;

/**
 * @author pparrado
 */
@Entity
@Table(name = "Image")
public class ImageEntity extends ApplicationPersistenceEntity implements Image {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ImageType imageType;

  private String extension;

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
   * @return imageType
   */
  public ImageType getImageType() {

    return this.imageType;
  }

  /**
   * @param imageType new value of {@link #getImageType}.
   */
  public void setImageType(ImageType imageType) {

    this.imageType = imageType;
  }

  /**
   * @return extension
   */
  public String getExtension() {

    return this.extension;
  }

  /**
   * @param extension new value of {@link #getExtension}.
   */
  public void setExtension(String extension) {

    this.extension = extension;
  }

}
