package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of InvitationGuest
 */
public class InvitationGuestCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private InvitationGuestEto invitationGuest;

  private ReservationEto reservation;

  public InvitationGuestEto getInvitationGuest() {

    return this.invitationGuest;
  }

  public void setInvitationGuest(InvitationGuestEto invitationGuest) {

    this.invitationGuest = invitationGuest;
  }

  public ReservationEto getReservation() {

    return this.reservation;
  }

  public void setReservation(ReservationEto reservation) {

    this.reservation = reservation;
  }

}
