package io.oasp.application.mtsj.reservationmanagement.dataaccess.api;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.reservationmanagement.common.api.InvitationGuest;

@Entity
@Table(name = "InvitationGuest")
public class InvitationGuestEntity extends ApplicationPersistenceEntity implements InvitationGuest {

  private ReservationEntity reservation;

  private String guestToken;

  private String email;

  private boolean accepted;

  private Timestamp modificationDate;

  private static final long serialVersionUID = 1L;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idReservation")
  public ReservationEntity getReservation() {

    return this.reservation;
  }

  public void setReservation(ReservationEntity reservation) {

    this.reservation = reservation;
  }

  @Override
  @Transient
  public Long getReservationId() {

    if (this.reservation == null) {
      return null;
    }
    return this.reservation.getId();
  }

  @Override
  public void setReservationId(Long reservationId) {

    if (reservationId == null) {
      this.reservation = null;
    } else {
      ReservationEntity reservationEntity = new ReservationEntity();
      reservationEntity.setId(reservationId);
      this.reservation = reservationEntity;
    }
  }

  @Override
  public String getGuestToken() {

    return this.guestToken;
  }

  @Override
  public void setGuestToken(String guestToken) {

    this.guestToken = guestToken;

  }

  @Override
  public String getEmail() {

    return this.email;
  }

  @Override
  public void setEmail(String email) {

    this.email = email;

  }

  @Override
  public boolean isAccepted() {

    return this.accepted;
  }

  @Override
  public void setAccepted(boolean accepted) {

    this.accepted = accepted;

  }

  @Override
  public Timestamp getModificationDate() {

    return this.modificationDate;
  }

  @Override
  public void setModificationDate(Timestamp modificationDate) {

    this.modificationDate = modificationDate;

  }

}
