package io.oasp.application.mtsj.reservationmanagement.service.impl.rest;

import java.security.NoSuchAlgorithmException;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.reservationmanagement.logic.api.Reservationmanagement;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.InvitationGuestEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.InvitationGuestSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.reservationmanagement.service.api.rest.ReservationmanagementRestService;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Reservationmanagement}.
 */
@Named("ReservationmanagementRestService")
public class ReservationmanagementRestServiceImpl implements ReservationmanagementRestService {

  @Inject
  private Reservationmanagement reservationmanagement;

  @Override
  public TableEto getTable(long id) {

    return this.reservationmanagement.findTable(id);
  }

  @Override
  public TableEto saveTable(TableEto table) {

    return this.reservationmanagement.saveTable(table);
  }

  @Override
  public void deleteTable(long id) {

    this.reservationmanagement.deleteTable(id);
  }

  @Override
  public PaginatedListTo<TableEto> findTablesByPost(TableSearchCriteriaTo searchCriteriaTo) {

    return this.reservationmanagement.findTableEtos(searchCriteriaTo);
  }

  @Override
  public ReservationEto getReservation(long id) {

    return this.reservationmanagement.findReservation(id);
  }

  @Override
  public ReservationEto saveReservation(ReservationEto reservation) throws NoSuchAlgorithmException {

    return this.reservationmanagement.saveReservation(reservation);
  }

  @Override
  public void deleteReservation(long id) {

    this.reservationmanagement.deleteReservation(id);
  }

  @Override
  public PaginatedListTo<ReservationEto> findReservationsByPost(ReservationSearchCriteriaTo searchCriteriaTo) {

    return this.reservationmanagement.findReservationEtos(searchCriteriaTo);
  }

  @Override
  public InvitationGuestEto getInvitationGuest(long id) {

    return this.reservationmanagement.findInvitationGuest(id);
  }

  @Override
  public InvitationGuestEto saveInvitationGuest(InvitationGuestEto invitationguest) {

    return this.reservationmanagement.saveInvitationGuest(invitationguest);
  }

  @Override
  public void deleteInvitationGuest(long id) {

    this.reservationmanagement.deleteInvitationGuest(id);
  }

  @Override
  public PaginatedListTo<InvitationGuestEto> findInvitationGuestsByPost(
      InvitationGuestSearchCriteriaTo searchCriteriaTo) {

    return this.reservationmanagement.findInvitationGuestEtos(searchCriteriaTo);
  }

  @Override
  public void cancelInvitation(String reservationToken) {

    this.reservationmanagement.cancelInvitation(reservationToken);

  }

}
