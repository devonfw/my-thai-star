package com.devonfw.application.dishmanagement.dataaccess.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devonfw.application.dishmanagement.dataaccess.DishEntity;

/**
 * {@link DefaultRepository} for {@link DishEntity}.
 */
public interface DishRepository extends JpaRepository<DishEntity, Long>, DishFragment {

  /**
   * @param criteria the {@link DishSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link DishEntity} objects that matched the search.
   */
  // default Page<DishEntity> findDishs(DishSearchCriteriaTo criteria) {
  //
  // DishEntity alias = newDslAlias();
  // JPAQuery<DishEntity> query = newDslQuery(alias);
  //
  // String searchBy = criteria.getSearchBy();
  // if (searchBy != null) {
  // query.where(Alias.$(alias.getName()).contains(searchBy).or(Alias.$(alias.getDescription()).contains(searchBy)));
  // }
  //
  // BigDecimal price = criteria.getMaxPrice();
  // if (price != null) {
  // query.where(Alias.$(alias.getPrice()).lt(price));
  // }
  //
  // return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  // }
}
