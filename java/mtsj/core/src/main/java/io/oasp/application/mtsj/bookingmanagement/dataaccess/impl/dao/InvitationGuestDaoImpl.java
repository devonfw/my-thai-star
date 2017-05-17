package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitationGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.InvitationGuestDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link InvitationGuestDao}.
 */
@Named
public class InvitationGuestDaoImpl extends ApplicationDaoImpl<InvitationGuestEntity> implements InvitationGuestDao {

  /**
   * The constructor.
   */
  public InvitationGuestDaoImpl() {

    super();
  }

  @Override
  public Class<InvitationGuestEntity> getEntityClass() {

    return InvitationGuestEntity.class;
  }

  @Override
  public PaginatedListTo<InvitationGuestEntity> findInvitationGuests(InvitationGuestSearchCriteriaTo criteria) {

    InvitationGuestEntity invitationguest = Alias.alias(InvitationGuestEntity.class);
    EntityPathBase<InvitationGuestEntity> alias = Alias.$(invitationguest);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    Long booking = criteria.getBookingId();
    if (booking != null) {
      if (invitationguest.getBooking() != null) {
        query.where(Alias.$(invitationguest.getBooking().getId()).eq(booking));
      }
    }
    String guestToken = criteria.getGuestToken();
    if (guestToken != null) {
      query.where(Alias.$(invitationguest.getGuestToken()).eq(guestToken));
    }
    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(invitationguest.getEmail()).eq(email));
    }
    boolean accepted = criteria.isAccepted();
    query.where(Alias.$(invitationguest.isAccepted()).eq(accepted));
    Timestamp modificationDate = criteria.getModificationDate();
    if (modificationDate != null) {
      query.where(Alias.$(invitationguest.getModificationDate()).eq(modificationDate));
    }
    return findPaginated(criteria, query, alias);
  }

}