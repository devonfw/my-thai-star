package com.devonfw.application.mtsj.dishmanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.CategoryEntity;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.CategorySearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link CategoryEntity}.
 */
public interface CategoryRepository extends DefaultRepository<CategoryEntity> {

  /**
   * @param criteria the {@link CategorySearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link CategoryEntity} objects that matched the search.
   */
  default Page<CategoryEntity> findCategorys(CategorySearchCriteriaTo criteria) {

    CategoryEntity alias = newDslAlias();
    JPAQuery<CategoryEntity> query = newDslQuery(alias);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
    }
    String description = criteria.getDescription();
    if ((description != null) && !description.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getDescription()), description, criteria.getDescriptionOption());
    }
    int showOrder = criteria.getShowOrder();
    query.where(Alias.$(alias.getShowOrder()).eq(showOrder));

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }

}
