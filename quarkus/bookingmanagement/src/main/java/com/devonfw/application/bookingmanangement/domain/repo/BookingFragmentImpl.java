package com.devonfw.application.bookingmanangement.domain.repo;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class BookingFragmentImpl implements BookingFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<BookingEntity> findUserByCriteria(BookingSearchCriteriaTo searchCriteria) {

    // BookingEntity bookingEntity;
    List<Predicate> predicates = new ArrayList<>();
    JPAQuery<BookingEntity> query = null;

    // JPAQuery<BookingEntity> query = new JPAQuery<BookingEntity>(this.em).from(bookingEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    // query.orderBy(userEntity.username.desc());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());
  }

}
