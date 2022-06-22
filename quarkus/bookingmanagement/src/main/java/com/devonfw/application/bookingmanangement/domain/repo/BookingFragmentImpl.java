package com.devonfw.application.bookingmanangement.domain.repo;

import static com.devonfw.application.bookingmanangement.utils.StringUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;
import com.devonfw.application.bookingmanangement.domain.model.QBookingEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class BookingFragmentImpl implements BookingFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<BookingEntity> findBookingsByCriteria(BookingSearchCriteriaTo searchCriteria) {

    QBookingEntity bookingEntity = QBookingEntity.bookingEntity;
    List<Predicate> predicates = new ArrayList<>();

    if (searchCriteria.getAssistants() != null) {
      predicates.add(bookingEntity.assistants.eq(searchCriteria.getAssistants()));
    }
    if (!isEmpty(searchCriteria.getBookingToken())) {
      predicates.add(bookingEntity.bookingToken.eq(searchCriteria.getBookingToken()));
    }

    JPAQuery<BookingEntity> query = new JPAQuery<BookingEntity>(this.em).from(bookingEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());
  }

}
