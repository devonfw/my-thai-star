package com.devonfw.application.bookingmanangement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestSearchCriteriaTo;

public interface InvitedGuestFragment {
  Page<InvitedGuestEntity> findInvitedGuests(InvitedGuestSearchCriteriaTo criteria);
}
