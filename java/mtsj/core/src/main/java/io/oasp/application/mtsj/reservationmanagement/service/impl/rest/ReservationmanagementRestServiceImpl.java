package io.oasp.application.mtsj.reservationmanagement.service.impl.rest;

import javax.inject.Inject;
import javax.inject.Named;

import io.oasp.application.mtsj.reservationmanagement.logic.api.Reservationmanagement;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationEto;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationSearchCriteriaTo;
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
  public ReservationEto getReservation(long id) {

    return this.reservationmanagement.findReservation(id);
  }

  @Override
  public ReservationEto saveReservation(ReservationEto reservation) {

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

}