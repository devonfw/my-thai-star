package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.repo;

import static com.querydsl.core.alias.Alias.$;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.bookingmanagement.dataaccess.api.InvitedGuestEntity;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import com.devonfw.module.jpa.dataaccess.api.QueryUtil;
import com.devonfw.module.jpa.dataaccess.api.data.DefaultRepository;
import com.querydsl.core.alias.Alias;
import com.querydsl.jpa.impl.JPAQuery;

/**
 * {@link DefaultRepository} for {@link InvitedGuestEntity}.
 */
public interface InvitedGuestRepository extends DefaultRepository<InvitedGuestEntity> {

  /**
   * @param token
   * @return the {@link InvitedGuestEntity} objects that matched the search.
   */
  @Query("SELECT invitedGuest FROM InvitedGuestEntity invitedGuest" //
      + " WHERE invitedGuest.guestToken = :token")
  InvitedGuestEntity findInvitedGuestByToken(@Param("token") String token);

  /**
   * @param idBooking
   * @return the List {@link InvitedGuestEntity} objects that matched the search.
   */
  @Query("SELECT invitedGuest FROM InvitedGuestEntity invitedGuest" //
      + " WHERE invitedGuest.booking.id = :idBooking")
  List<InvitedGuestEntity> findInvitedGuestByBooking(@Param("idBooking") Long idBooking);

  /**
   * @param criteria the {@link InvitedGuestSearchCriteriaTo} with the criteria to search.
   * @return the {@link Page} of the {@link InvitedGuestEntity} objects that matched the search.
   */
  default Page<InvitedGuestEntity> findInvitedGuests(InvitedGuestSearchCriteriaTo criteria) {

    InvitedGuestEntity alias = newDslAlias();
    JPAQuery<InvitedGuestEntity> query = newDslQuery(alias);

    Long booking = criteria.getBookingId();
    if (booking != null && alias.getBooking() != null) {
      query.where(Alias.$(alias.getBooking().getId()).eq(booking));
    }
    String guestToken = criteria.getGuestToken();
    if ((guestToken != null) && !guestToken.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getGuestToken()), guestToken, criteria.getGuestTokenOption());
    }
    String email = criteria.getEmail();
    if ((email != null) && !email.isEmpty()) {
      QueryUtil.get().whereString(query, $(alias.getEmail()), email, criteria.getEmailOption());
    }
    Boolean accepted = criteria.getAccepted();
    if (accepted != null) {
      query.where(Alias.$(alias.getAccepted()).eq(accepted));
    }
    Timestamp modificationDate = criteria.getModificationDate();
    if (modificationDate != null) {
      query.where(Alias.$(alias.getModificationDate()).eq(modificationDate));
    }

    return QueryUtil.get().findPaginated(criteria.getPageable(), query, false);
  }

}
