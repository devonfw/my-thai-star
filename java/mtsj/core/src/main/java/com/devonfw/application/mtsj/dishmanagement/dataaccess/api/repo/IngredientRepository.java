package com.devonfw.application.mtsj.dishmanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.math.BigDecimal;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import com.devonfw.application.mtsj.dishmanagement.logic.api.to.IngredientSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link IngredientEntity}.
 */
public interface IngredientRepository extends DefaultRepository<IngredientEntity> {

  /**
   * @param criteria the {@link IngredientSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link IngredientEntity} objects that matched the search.
   */
  default Page<IngredientEntity> findIngredients(IngredientSearchCriteriaTo criteria) {

    IngredientEntity alias = newDslAlias();
    JPAQuery<IngredientEntity> query = newDslQuery(alias);

    String name = criteria.getName();
    if ((name != null) && !name.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
    }
    String description = criteria.getDescription();
    if ((description != null) && !description.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getDescription()), description, criteria.getDescriptionOption());
    }

    BigDecimal price = criteria.getPrice();
    if (price != null) {
      query.where(Alias.$(alias.getPrice()).eq(price));
    }
    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }
}
