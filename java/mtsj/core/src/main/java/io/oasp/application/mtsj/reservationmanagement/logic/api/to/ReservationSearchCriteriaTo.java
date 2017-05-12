package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import java.sql.Timestamp;

import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.reservationmanagement.common.api.Reservation}s.
 *
 */
public class ReservationSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Long idUser;

  private String name;

  private String reservationToken;

  private String comment;

  private Timestamp bookingDate;

  private Timestamp expirationDate;

  private Timestamp creationDate;

  private Boolean canceled;

  private Integer reservationType;

  private Long idTable;

  /**
   * The constructor.
   */
  public ReservationSearchCriteriaTo() {

    super();
  }

  public Long getIdUser() {

    return this.idUser;
  }

  public void setIdUser(Long idUser) {

    this.idUser = idUser;
  }

  public String getName() {

    return this.name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public String getReservationToken() {

    return this.reservationToken;
  }

  public void setReservationToken(String reservationToken) {

    this.reservationToken = reservationToken;
  }

  public String getComment() {

    return this.comment;
  }

  public void setComment(String comment) {

    this.comment = comment;
  }

  public Timestamp getBookingDate() {

    return this.bookingDate;
  }

  public void setBookingDate(Timestamp bookingDate) {

    this.bookingDate = bookingDate;
  }

  public Timestamp getExpirationDate() {

    return this.expirationDate;
  }

  public void setExpirationDate(Timestamp expirationDate) {

    this.expirationDate = expirationDate;
  }

  public Timestamp getCreationDate() {

    return this.creationDate;
  }

  public void setCreationDate(Timestamp creationDate) {

    this.creationDate = creationDate;
  }

  public Boolean isCanceled() {

    return this.canceled;
  }

  public void setCanceled(Boolean canceled) {

    this.canceled = canceled;
  }

  public Integer getReservationType() {

    return this.reservationType;
  }

  public void setReservationType(Integer reservationType) {

    this.reservationType = reservationType;
  }

  public Long getIdTable() {

    return this.idTable;
  }

  public void setIdTable(Long idTable) {

    this.idTable = idTable;
  }

}
