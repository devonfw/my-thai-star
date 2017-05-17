package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.sql.Timestamp;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitedGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.InvitedGuestDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
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
    if (booking != null) {
      if (invitedguest.getBooking() != null) {
        query.where(Alias.$(invitedguest.getBooking().getId()).eq(booking));
      }
    }
    String guestToken = criteria.getGuestToken();
    if (guestToken != null) {
      query.where(Alias.$(invitedguest.getGuestToken()).eq(guestToken));
    }
    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(invitedguest.getEmail()).eq(email));
    }
    boolean accepted = criteria.isAccepted();
    query.where(Alias.$(invitedguest.isAccepted()).eq(accepted));
    Timestamp modificationDate = criteria.getModificationDate();
    if (modificationDate != null) {
      query.where(Alias.$(invitedguest.getModificationDate()).eq(modificationDate));
    }
    return findPaginated(criteria, query, alias);
  }

}