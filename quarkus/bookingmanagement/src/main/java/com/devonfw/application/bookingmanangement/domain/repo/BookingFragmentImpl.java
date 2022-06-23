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

    if (!isEmpty(searchCriteria.getName())) {
      predicates.add(bookingEntity.name.eq(searchCriteria.getName()));
    }
    if (!isEmpty(searchCriteria.getBookingToken())) {
      predicates.add(bookingEntity.bookingToken.eq(searchCriteria.getBookingToken()));
    }
    if (!isEmpty(searchCriteria.getComment())) {
      predicates.add(bookingEntity.comment.eq(searchCriteria.getComment()));
    }
    if (searchCriteria.getBookingDate() != null) {
      predicates.add(bookingEntity.bookingDate.eq(searchCriteria.getBookingDate()));
    }
    if (searchCriteria.getExpirationDate() != null) {
      predicates.add(bookingEntity.expirationDate.eq(searchCriteria.getExpirationDate()));
    }
    if (searchCriteria.getCreationDate() != null) {
      predicates.add(bookingEntity.creationDate.eq(searchCriteria.getCreationDate()));
    }
    if (!isEmpty(searchCriteria.getEmail())) {
      predicates.add(bookingEntity.email.eq(searchCriteria.getEmail()));
    }
    if (searchCriteria.getCanceled() != null) {
      predicates.add(bookingEntity.canceled.eq(searchCriteria.getCanceled()));
    }
    if (searchCriteria.getBookingType() != null) {
      predicates.add(bookingEntity.bookingType.eq(searchCriteria.getBookingType()));
    }
    if (searchCriteria.getTableId() != null) {
      predicates.add(bookingEntity.table.id.eq(searchCriteria.getTableId()));
    }

    JPAQuery<BookingEntity> query = new JPAQuery<BookingEntity>(this.em).from(bookingEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());
  }

}
