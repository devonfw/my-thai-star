package io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.InvitedGuestEntity;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.InvitedGuestSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for InvitedGuest entities
 */
public interface InvitedGuestDao extends ApplicationDao<InvitedGuestEntity> {

  /**
   * Finds the {@link InvitedGuestEntity invitedguests} matching the given {@link InvitedGuestSearchCriteriaTo}.
   *
   * @param criteria is the {@link InvitedGuestSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link InvitedGuestEntity} objects.
   */
  PaginatedListTo<InvitedGuestEntity> findInvitedGuests(InvitedGuestSearchCriteriaTo criteria);

}
