package com.devonfw.application.mtsj.bookingmanagement.dataaccess.api;

import java.sql.Timestamp;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.devonfw.application.mtsj.bookingmanagement.common.api.InvitedGuest;
import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.dataaccess.api.OrderEntity;

@Entity
@Table(name = "InvitedGuest")
public class InvitedGuestEntity extends ApplicationPersistenceEntity implements InvitedGuest {

  private BookingEntity booking;

  private String guestToken;

  private String email;

  private Boolean accepted;

  private Timestamp modificationDate;

  private OrderEntity order;

  private static final long serialVersionUID = 1L;

  public InvitedGuestEntity() {

    super();
  }

  /**
   * @return booking
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idBooking")
  public BookingEntity getBooking() {

    return this.booking;
  }

  /**
   * @param booking new value of {@link #getbooking}.
   */
  public void setBooking(BookingEntity booking) {

    this.booking = booking;
  }

  /**
   * @return guestToken
   */
  public String getGuestToken() {

    return this.guestToken;
  }

  /**
   * @param guestToken new value of {@link #getguestToken}.
   */
  public void setGuestToken(String guestToken) {

    this.guestToken = guestToken;
  }

  /**
   * @return email
   */
  public String getEmail() {

    return this.email;
  }

  /**
   * @param email new value of {@link #getemail}.
   */
  public void setEmail(String email) {

    this.email = email;
  }

  /**
   * @return accepted
   */
  public Boolean getAccepted() {

    return this.accepted;
  }

  /**
   * @param accepted new value of {@link #getaccepted}.
   */
  public void setAccepted(Boolean accepted) {

    this.accepted = accepted;
  }

  /**
   * @return modificationDate
   */
  public Timestamp getModificationDate() {

    return this.modificationDate;
  }

  /**
   * @param modificationDate new value of {@link #getmodificationDate}.
   */
  public void setModificationDate(Timestamp modificationDate) {

    this.modificationDate = modificationDate;
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

  /**
   * @return order
   */
  @OneToOne
  @JoinColumn(name = "idOrder")
  public OrderEntity getOrder() {

    return this.order;
  }

  /**
   * @param order new value of {@link #getorder}.
   */
  public void setOrder(OrderEntity order) {

    this.order = order;
  }

}
