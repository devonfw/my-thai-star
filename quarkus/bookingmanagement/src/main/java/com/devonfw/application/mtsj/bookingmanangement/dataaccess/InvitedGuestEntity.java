package com.devonfw.application.mtsj.bookingmanangement.dataaccess;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Table(name = "InvitedGuest")
@ToString(callSuper = true, includeFieldNames = true)
public class InvitedGuestEntity extends ApplicationPersistenceEntity {
  // private BookingEntity booking;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Instant modificationDate;

  private Long idBooking;

}
