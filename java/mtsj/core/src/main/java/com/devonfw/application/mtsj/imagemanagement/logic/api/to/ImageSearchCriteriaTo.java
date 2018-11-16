package com.devonfw.application.mtsj.imagemanagement.logic.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;
import com.devonfw.application.mtsj.imagemanagement.common.api.datatype.ContentType;
import com.devonfw.module.basic.common.api.query.StringSearchConfigTo;

/**
 * used to find {@link com.devonfw.application.mtsj.imagemanagement.common.api.Image}s.
 *
 */
public class ImageSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String content;

  private ContentType contentType;

  private String mimeType;

  private StringSearchConfigTo nameOption;

  private StringSearchConfigTo contentOption;

  private StringSearchConfigTo mimeTypeOption;

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

  public ContentType getContentType() {

    return this.contentType;
  }

  public void setContentType(ContentType contentType) {

    this.contentType = contentType;
  }

  public String getMimeType() {

    return this.mimeType;
  }

  public void setExtension(String mimeType) {

    this.mimeType = mimeType;
  }

  /**
   * @return nameOption
   */
  public StringSearchConfigTo getNameOption() {

    return this.nameOption;
  }

  /**
   * @param nameOption new value of {@link #getnameOption}.
   */
  public void setNameOption(StringSearchConfigTo nameOption) {

    this.nameOption = nameOption;
  }

  /**
   * @return contentOption
   */
  public StringSearchConfigTo getContentOption() {

    return this.contentOption;
  }

  /**
   * @param contentOption new value of {@link #getcontentOption}.
   */
  public void setContentOption(StringSearchConfigTo contentOption) {

    this.contentOption = contentOption;
  }

  /**
   * @return mimeTypeOption
   */
  public StringSearchConfigTo getMimeTypeOption() {

    return this.mimeTypeOption;
  }

  /**
   * @param mimeTypeOption new value of {@link #getmimeTypeOption}.
   */
  public void setMimeTypeOption(StringSearchConfigTo mimeTypeOption) {

    this.mimeTypeOption = mimeTypeOption;
  }

  /**
   * @param mimeType new value of {@link #getmimeType}.
   */
  public void setMimeType(String mimeType) {

    this.mimeType = mimeType;
  }

}
