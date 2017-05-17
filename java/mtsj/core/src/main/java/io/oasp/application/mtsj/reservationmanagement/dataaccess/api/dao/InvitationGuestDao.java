package io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.InvitationGuestEntity;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for InvitationGuest entities
 */
public interface InvitationGuestDao extends ApplicationDao<InvitationGuestEntity> {

  /**
   * Finds the {@link InvitationGuestEntity invitationguests} matching the given
   * {@link InvitationGuestSearchCriteriaTo}.
   *
   * @param criteria is the {@link InvitationGuestSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link InvitationGuestEntity} objects.
   */
  PaginatedListTo<InvitationGuestEntity> findInvitationGuests(InvitationGuestSearchCriteriaTo criteria);
}
