package io.oasp.application.mtsj.imagemanagement.dataaccess.impl.dao;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.imagemanagement.common.api.datatype.ContentType;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.ImageEntity;
import io.oasp.application.mtsj.imagemanagement.dataaccess.api.dao.ImageDao;
import io.oasp.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyDaoQuerySupport;

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
    JPAQuery query = (JPAQuery) new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(image.getName()).toLowerCase().eq(name.toLowerCase()));
    }
    String content = criteria.getContent();
    if (content != null) {
      query.where(Alias.$(image.getContent()).toLowerCase().eq(content.toLowerCase()));
    }
    ContentType contentType = criteria.getContentType();
    if (contentType != null) {
      query.where(Alias.$(image.getContentType()).eq(contentType));
    }
    String mimeType = criteria.getMimeType();
    if (mimeType != null) {
      query.where(Alias.$(image.getMimeType()).toLowerCase().eq(mimeType.toLowerCase()));
    }
    return LegacyDaoQuerySupport.findPaginated(criteria, query, alias);
  }

}