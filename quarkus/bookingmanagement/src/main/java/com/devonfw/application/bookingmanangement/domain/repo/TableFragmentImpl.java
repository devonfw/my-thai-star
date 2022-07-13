package com.devonfw.application.bookingmanangement.domain.repo;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.bookingmanangement.domain.model.QTableEntity;
import com.devonfw.application.bookingmanangement.domain.model.TableEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.TableSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class TableFragmentImpl implements TableFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<TableEntity> findTables(TableSearchCriteriaTo searchCriteria) {

    QTableEntity tableEntity = QTableEntity.tableEntity;
    List<Predicate> predicates = new ArrayList<>();

    if (searchCriteria.getSeatsNumber() != null) {
      predicates.add(tableEntity.seatsNumber.eq(searchCriteria.getSeatsNumber()));
    }

    JPAQuery<TableEntity> query = new JPAQuery<TableEntity>(this.em).from(tableEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());

  }

}
