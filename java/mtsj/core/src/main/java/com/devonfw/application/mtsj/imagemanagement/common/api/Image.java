package com.devonfw.application.mtsj.imagemanagement.common.api;

<<<<<<< HEAD
import java.sql.Blob;

=======
<<<<<<< HEAD:java/mtsj/api/src/main/java/com/devonfw/application/mtsj/imagemanagement/common/api/Image.java
=======
import java.sql.Blob;

>>>>>>> 68dc2dc7be070ba6dcda0ef6d56f29aca99f9116:java/mtsj/core/src/main/java/com/devonfw/application/mtsj/imagemanagement/common/api/Image.java
>>>>>>> 68dc2dc7be070ba6dcda0ef6d56f29aca99f9116
import com.devonfw.application.mtsj.general.common.api.ApplicationEntity;
import com.devonfw.application.mtsj.imagemanagement.common.api.datatype.ContentType;

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
  public Blob getContent();

  /**
   * @param content of the {@link Image}
   */
  public void setContent(Blob content);

  /**
   * @return contentType of the {@link Image}
   */
  public ContentType getContentType();

  /**
   * @param contentType of the {@link Image}
   */
  public void setContentType(ContentType contentType);

  /**
   * @return mimeType of the {@link Image}
   */
  public String getMimeType();

  /**
   * @param mimeType of the {@link Image}
   */
  public void setMimeType(String mimeType);

}
