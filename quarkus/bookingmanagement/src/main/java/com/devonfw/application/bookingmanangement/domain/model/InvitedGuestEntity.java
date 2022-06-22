package com.devonfw.application.bookingmanangement.domain.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationPersistenceEntity;

import lombok.Setter;
import lombok.ToString;

@Entity
@Setter
@Table(name = "InvitedGuest")
@ToString(callSuper = true, includeFieldNames = true)
public class InvitedGuestEntity extends ApplicationPersistenceEntity {
  private BookingEntity booking;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

  private Long idBooking;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idBooking", insertable = false, updatable = false)
  public BookingEntity getBooking() {

    return this.booking;
  }

  /**
   * @return guestToken
   */
  public String getGuestToken() {

    return this.guestToken;
  }

  /**
   * @return email
   */
  public String getEmail() {

    return this.email;
  }

  /**
   * @return accepted
   */
  public Boolean getAccepted() {

    return this.accepted;
  }

  /**
   * @return modificationDate
   */
  public Instant getModificationDate() {

    return this.modificationDate;
  }

  /**
   * @return idBooking
   */
  public Long getIdBooking() {

    return this.idBooking;
  }

}
