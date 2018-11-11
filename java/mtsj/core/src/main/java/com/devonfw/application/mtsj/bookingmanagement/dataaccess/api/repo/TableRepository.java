package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link TableEntity}.
 */
public interface TableRepository extends DefaultRepository<TableEntity> {

  /**
   * @param criteria the {@link TableSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link TableEntity} objects that matched the search.
   */
  default Page<TableEntity> findTables(TableSearchCriteriaTo criteria) {

    TableEntity alias = newDslAlias();
    JPAQuery<TableEntity> query = newDslQuery(alias);

    Integer seatsNumber = criteria.getSeatsNumber();
    if (seatsNumber != null) {
      query.where(Alias.$(alias.getSeatsNumber()).eq(seatsNumber));
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);

  }
}
