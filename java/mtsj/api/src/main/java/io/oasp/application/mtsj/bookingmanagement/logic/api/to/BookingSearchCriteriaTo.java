package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import java.sql.Timestamp;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.module.jpa.common.api.to.SearchCriteriaTo;

/**
 * This is the {@link SearchCriteriaTo search criteria} {@link net.sf.mmm.util.transferobject.api.TransferObject TO}
 * used to find {@link io.oasp.application.mtsj.bookingmanagement.common.api.Booking}s.
 */
public class BookingSearchCriteriaTo extends SearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private String name;

  private String bookingToken;

  private String comment;

  private Timestamp bookingDate;

  private Timestamp expirationDate;

  private Timestamp creationDate;

  private String email;

  private Boolean canceled;

  private BookingType bookingType;

  private Long tableId;

  private Long orderId;

  private Integer assistants;

  private Long userId;

  /**
   * The constructor.
   */
  public BookingSearchCriteriaTo() {

    super();
  }

  public String getName() {

    return this.name;
  }

  public void setName(String name) {

    this.name = name;
  }

  public String getBookingToken() {

    return this.bookingToken;
  }

  public void setBookingToken(String bookingToken) {

    this.bookingToken = bookingToken;
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

  public String getEmail() {

    return this.email;
  }

  public void setEmail(String email) {

    this.email = email;
  }

  public Boolean getCanceled() {

    return this.canceled;
  }

  public void setCanceled(Boolean canceled) {

    this.canceled = canceled;
  }

  public BookingType getBookingType() {

    return this.bookingType;
  }

  public void setBookingType(BookingType bookingType) {

    this.bookingType = bookingType;
  }

  public Long getTableId() {

    return this.tableId;
  }

  public void setTableId(Long tableId) {

    this.tableId = tableId;
  }

  public Long getOrderId() {

    return orderId;
  }

  public void setOrderId(Long orderId) {

    this.orderId = orderId;
  }

  public Integer getAssistants() {

    return assistants;
  }

  public void setAssistants(Integer assistants) {

    this.assistants = assistants;
  }

  public Long getUserId() {

    return userId;
  }

  public void setUserId(Long userId) {

    this.userId = userId;
  }

}
