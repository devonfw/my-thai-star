package com.devonfw.application.bookingmanangement.domain.repo;

import static com.devonfw.application.bookingmanangement.utils.StringUtils.isEmpty;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;
import com.devonfw.application.bookingmanangement.domain.model.QInvitedGuestEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestSearchCriteriaTo;
import com.devonfw.application.bookingmanangement.utils.QueryUtil;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.impl.JPAQuery;

public class InvitedGuestFragmentImpl implements InvitedGuestFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<InvitedGuestEntity> findInvitedGuests(InvitedGuestSearchCriteriaTo searchCriteria) {

    QInvitedGuestEntity invitedGuestEntity = QInvitedGuestEntity.invitedGuestEntity;
    List<Predicate> predicates = new ArrayList<>();

    if (searchCriteria.getBookingId() != null) {
      predicates.add(invitedGuestEntity.booking.id.eq(searchCriteria.getBookingId()));
    }
    if (!isEmpty(searchCriteria.getGuestToken())) {
      predicates.add(invitedGuestEntity.guestToken.eq(searchCriteria.getGuestToken()));
    }

    if (!isEmpty(searchCriteria.getEmail())) {
      predicates.add(invitedGuestEntity.email.eq(searchCriteria.getEmail()));
    }

    if (searchCriteria.getAccepted() != null) {
      predicates.add(invitedGuestEntity.accepted.eq(searchCriteria.getAccepted()));
    }

    JPAQuery<InvitedGuestEntity> query = new JPAQuery<InvitedGuestEntity>(this.em).from(invitedGuestEntity);
    if (!predicates.isEmpty()) {
      query.where(predicates.toArray(Predicate[]::new));
    }
    Pageable pageable = PageRequest.of(searchCriteria.getPageNumber(), searchCriteria.getPageSize());
    return QueryUtil.findPaginated(pageable, query, searchCriteria.isDetermineTotal());

  }
}
