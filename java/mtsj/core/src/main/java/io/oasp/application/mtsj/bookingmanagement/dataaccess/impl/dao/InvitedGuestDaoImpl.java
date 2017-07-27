package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitedGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.InvitedGuestDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link InvitedGuestDao}.
 */
@Named
public class InvitedGuestDaoImpl extends ApplicationDaoImpl<InvitedGuestEntity> implements InvitedGuestDao {

  /**
   * The constructor.
   */
  public InvitedGuestDaoImpl() {

    super();
  }

  @Override
  public Class<InvitedGuestEntity> getEntityClass() {

    return InvitedGuestEntity.class;
  }

  @Override
  public PaginatedListTo<InvitedGuestEntity> findInvitedGuests(InvitedGuestSearchCriteriaTo criteria) {

    InvitedGuestEntity invitedguest = Alias.alias(InvitedGuestEntity.class);
    EntityPathBase<InvitedGuestEntity> alias = Alias.$(invitedguest);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    Long booking = criteria.getBookingId();
    if (booking != null && invitedguest.getBooking() != null) {
        query.where(Alias.$(invitedguest.getBooking().getId()).eq(booking));
    }
    String guestToken = criteria.getGuestToken();
    if (guestToken != null) {
      query.where(Alias.$(invitedguest.getGuestToken()).eq(guestToken));
    }
    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(invitedguest.getEmail()).eq(email));
    }
    Boolean accepted = criteria.getAccepted();
    if (accepted != null) {
      query.where(Alias.$(invitedguest.getAccepted()).eq(accepted));
    }
    Timestamp modificationDate = criteria.getModificationDate();
    if (modificationDate != null) {
      query.where(Alias.$(invitedguest.getModificationDate()).eq(modificationDate));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<InvitedGuestEntity> alias, InvitedGuestEntity invitedguest,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("guestToken".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(invitedguest.getGuestToken()).asc());
          } else {
            query.orderBy(Alias.$(invitedguest.getGuestToken()).desc());
          }
        } else if ("email".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(invitedguest.getEmail()).asc());
          } else {
            query.orderBy(Alias.$(invitedguest.getEmail()).desc());
          }
        } else if ("accepted".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(invitedguest.getAccepted()).asc());
          } else {
            query.orderBy(Alias.$(invitedguest.getAccepted()).desc());
          }
        } else if ("modificationDate".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(invitedguest.getModificationDate()).asc());
          } else {
            query.orderBy(Alias.$(invitedguest.getModificationDate()).desc());
          }
        }
      }
    }
  }

}
