package com.devonfw.application.mtsj.ordermanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.util.Iterator;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;

import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderStateEntity;
import com.devonfw.application.mtsj.ordermanagement.logic.api.to.OrderStateSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link OrderStateEntity}
 */
public interface OrderStateRepository extends DefaultRepository<OrderStateEntity> {

  /**
   * @param criteria the {@link OrderStateSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link OrderStateEntity} objects that matched the search. If no pageable is set, it
   *         will return a unique page with all the objects that matched the search.
   */
  default Page<OrderStateEntity> findByCriteria(OrderStateSearchCriteriaTo criteria) {

    OrderStateEntity alias = newDslAlias();
    JPAQuery<OrderStateEntity> query = newDslQuery(alias);

    String stateName = criteria.getStateName();
    if (stateName != null && !stateName.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getStateName()), stateName, criteria.getStateNameOption());
    }
    if (criteria.getPageable() == null) {
      criteria.setPageable(PageRequest.of(0, Integer.MAX_VALUE));
    } else {
      addOrderBy(query, alias, criteria.getPageable().getSort());
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, true);
  }

  /**
   * Add sorting to the given query on the given alias
   * 
   * @param query to add sorting to
   * @param alias to retrieve columns from for sorting
   * @param sort specification of sorting
   */
  public default void addOrderBy(JPAQuery<OrderStateEntity> query, OrderStateEntity alias, Sort sort) {

    if (sort != null && sort.isSorted()) {
      Iterator<Order> it = sort.iterator();
      while (it.hasNext()) {
        Order next = it.next();
        switch (next.getProperty()) {
          case "stateName":
            if (next.isAscending()) {
              query.orderBy($(alias.getStateName()).asc());
            } else {
              query.orderBy($(alias.getStateName()).desc());
            }
            break;
          default:
            throw new IllegalArgumentException("Sorted by the unknown property '" + next.getProperty() + "'");
        }
      }
    }
  }

}