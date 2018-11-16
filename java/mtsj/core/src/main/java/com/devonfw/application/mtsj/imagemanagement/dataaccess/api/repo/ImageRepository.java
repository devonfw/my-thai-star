package com.devonfw.application.mtsj.imagemanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.imagemanagement.common.api.datatype.ContentType;
import com.devonfw.application.mtsj.imagemanagement.dataaccess.api.ImageEntity;
import com.devonfw.application.mtsj.imagemanagement.logic.api.to.ImageSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link ImageEntity}.
 */
public interface ImageRepository extends DefaultRepository<ImageEntity> {

  /**
   * @param criteria the {@link ImageSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link ImageEntity} objects that matched the search.
   */
  default Page<ImageEntity> findImages(ImageSearchCriteriaTo criteria) {

    ImageEntity alias = newDslAlias();
    JPAQuery<ImageEntity> query = newDslQuery(alias);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
    }
    String content = criteria.getContent();
    if ((content != null) && !content.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getContent()), content, criteria.getContentOption());
    }
    ContentType contentType = criteria.getContentType();
    if (contentType != null) {
      query.where(Alias.$(alias.getContentType()).eq(contentType));
    }
    String mimeType = criteria.getMimeType();
    if ((mimeType != null) && !mimeType.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getMimeType()), mimeType, criteria.getMimeTypeOption());
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }

}
