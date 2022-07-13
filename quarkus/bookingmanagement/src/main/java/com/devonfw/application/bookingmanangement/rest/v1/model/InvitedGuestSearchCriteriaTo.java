package com.devonfw.application.bookingmanangement.rest.v1.model;

import java.time.Instant;

import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationSearchCriteriaDto;

import lombok.Data;

@Data
public class InvitedGuestSearchCriteriaTo extends ApplicationSearchCriteriaDto {

  private static final long serialVersionUID = 1L;

  private Long bookingId;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;
}
