package io.oasp.application.mtsj.imagemanagement.common.api;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import io.oasp.application.mtsj.general.common.api.datatype.ImageType;

/**
 * Interface for {@link Image}
 *
 */
public interface Image extends ApplicationEntity {

  /**
   * @return name of the {@link Image}
   */
  public String getName();

  /**
   * @param name of the {@link Image}
   */
  public void setName(String name);

  /**
   * @return content of the {@link Image}
   */
  public String getContent();

  /**
   * @param content of the {@link Image}
   */
  public void setContent(String content);

  /**
   * @return imageType of the {@link Image}
   */
  public ImageType getImageType();

  /**
   * @param imageType of the {@link Image}
   */
  public void setImageType(ImageType imageType);

  /**
   * @return extension of the {@link Image}
   */
  public String getExtension();

  /**
   * @param extension of the {@link Image}
   */
  public void setExtension(String extension);

}
