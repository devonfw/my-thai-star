package io.oasp.application.mtsj.imagemanagement.dataaccess.impl.dao;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.imagemanagement.common.api.datatype.ContentType;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.ImageEntity;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.dao.ImageDao;
import io.oasp.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link ImageDao}.
 */
@Named
public class ImageDaoImpl extends ApplicationDaoImpl<ImageEntity> implements ImageDao {

  /**
   * The constructor.
   */
  public ImageDaoImpl() {

    super();
  }

  @Override
  public Class<ImageEntity> getEntityClass() {

    return ImageEntity.class;
  }

  @Override
  public PaginatedListTo<ImageEntity> findImages(ImageSearchCriteriaTo criteria) {

    ImageEntity image = Alias.alias(ImageEntity.class);
    EntityPathBase<ImageEntity> alias = Alias.$(image);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(image.getName()).eq(name));
    }
    String content = criteria.getContent();
    if (content != null) {
      query.where(Alias.$(image.getContent()).eq(content));
    }
    ContentType contentType = criteria.getContentType();
    if (contentType != null) {
      query.where(Alias.$(image.getContentType()).eq(contentType));
    }
    String mimeType = criteria.getMimeType();
    if (mimeType != null) {
      query.where(Alias.$(image.getMimeType()).eq(mimeType));
    }
    return findPaginated(criteria, query, alias);
  }

}