package com.devonfw.application.mtsj.ordermanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderLineEntity;
import com.devonfw.application.mtsj.ordermanagement.logic.api.to.OrderLineSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link OrderLineEntity}.
 */
public interface OrderLineRepository extends DefaultRepository<OrderLineEntity> {

  /**
   * @param id
   * @return the list {@link OrderLineEntity} objects that matched the search.
   */
  @Query("SELECT orderLines FROM OrderLineEntity orderLines" //
      + " WHERE orderLines.order.id = :id")
  List<OrderLineEntity> findOrderLines(@Param("id") Long id);

  /**
   * @param criteria the {@link OrderLineSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link OrderLineEntity} objects that matched the search.
   */
  default Page<OrderLineEntity> findOrderLines(OrderLineSearchCriteriaTo criteria) {

    OrderLineEntity alias = newDslAlias();
    JPAQuery<OrderLineEntity> query = newDslQuery(alias);

    Long order = criteria.getOrderId();
    if (order != null && alias.getOrder() != null) {
      query.where(Alias.$(alias.getOrder().getId()).eq(order));
    }
    Long dish = criteria.getDishId();
    if (dish != null && alias.getDish() != null) {
      query.where(Alias.$(alias.getDish().getId()).eq(dish));
    }
    Integer amount = criteria.getAmount();
    if (amount != null) {
      query.where(Alias.$(alias.getAmount()).eq(amount));
    }
    String comment = criteria.getComment();
    if ((comment != null) && !comment.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getComment()), comment, criteria.getCommentOption());
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }
}
