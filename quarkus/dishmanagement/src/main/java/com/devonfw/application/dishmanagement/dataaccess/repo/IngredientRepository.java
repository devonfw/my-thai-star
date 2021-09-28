package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.dataaccess.IngredientEntity;

/**
 * {@link DefaultRepository} for {@link IngredientEntity}.
 */
public interface IngredientRepository extends JpaRepository<IngredientEntity, Long> {

  /**
   * @param criteria the {@link IngredientSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link IngredientEntity} objects that matched the search.
   */
  // default Page<IngredientEntity> findIngredients(IngredientSearchCriteriaTo criteria) {
  //
  // IngredientEntity alias = newDslAlias();
  // JPAQuery<IngredientEntity> query = newDslQuery(alias);
  //
  // String name = criteria.getName();
  // if ((name != null) && !name.isEmpty()) {
  // QueryUtil.get().whereString(query, $(alias.getName()), name, criteria.getNameOption());
  // }
  // String description = criteria.getDescription();
  // if ((description != null) && !description.isEmpty()) {
  // QueryUtil.get().whereString(query, $(alias.getDescription()), description, criteria.getDescriptionOption());
  // }
  //
  // BigDecimal price = criteria.getPrice();
  // if (price != null) {
  // query.where(Alias.$(alias.getPrice()).eq(price));
  // }
  // return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  // }
}
