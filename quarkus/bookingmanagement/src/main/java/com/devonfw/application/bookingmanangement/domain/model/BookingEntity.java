package com.devonfw.application.bookingmanangement.domain.model;

import java.time.Instant;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Digits;
import javax.validation.constraints.Min;

import com.devonfw.application.bookingmanangement.general.domain.model.ApplicationPersistenceEntity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString(callSuper = true, includeFieldNames = true)
@Table(name = "Booking")
public class BookingEntity extends ApplicationPersistenceEntity {

  private String name;

  private String bookingToken;

  private String comment;

  private Instant bookingDate;

  private Instant expirationDate;

  private Instant creationDate;

  private String email;

  private Boolean canceled;

  private BookingType bookingType;

  private TableEntity table;

  @Min(value = 1, message = "Assistants must be greater than 0")
  @Digits(integer = 2, fraction = 0)
  private Integer assistants;

  private List<InvitedGuestEntity> invitedGuests;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "idTable")
  public TableEntity getTable() {

    return this.table;
  }

  @OneToMany(mappedBy = "booking", fetch = FetchType.LAZY)
  public List<InvitedGuestEntity> getInvitedGuests() {

    return this.invitedGuests;
  }

}
