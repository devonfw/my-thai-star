package io.oasp.application.mtsj.bookingmanagement.dataaccess.api;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import io.oasp.application.mtsj.bookingmanagement.common.api.InvitedGuest;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

@Entity
@Table(name = "InvitedGuest")
public class InvitedGuestEntity extends ApplicationPersistenceEntity implements InvitedGuest {

  private BookingEntity booking;

  private String guestToken;

  private String email;

  private boolean accepted;

  private Timestamp modificationDate;

  private static final long serialVersionUID = 1L;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idBooking")
  public BookingEntity getBooking() {

    return this.booking;
  }

  public void setBooking(BookingEntity booking) {

    this.booking = booking;
  }

  @Override
  @Transient
  public Long getBookingId() {

    if (this.booking == null) {
      return null;
    }
    return this.booking.getId();
  }

  @Override
  public void setBookingId(Long bookingId) {

    if (bookingId == null) {
      this.booking = null;
    } else {
      BookingEntity bookingEntity = new BookingEntity();
      bookingEntity.setId(bookingId);
      this.booking = bookingEntity;
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
