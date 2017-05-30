package io.oasp.application.mtsj.bookingmanagement.common.api;

import java.sql.Timestamp;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Booking extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getBookingToken();

  public void setBookingToken(String bookingToken);

  public String getComment();

  public void setComment(String comment);

  public Timestamp getBookingDate();

  public void setBookingDate(Timestamp bookingDate);

  public Timestamp getExpirationDate();

  public void setExpirationDate(Timestamp expirationDate);

  public Timestamp getCreationDate();

  public void setCreationDate(Timestamp creationDate);

  public String getEmail();

  public void setEmail(String email);

  public Boolean getCanceled();

  public void setCanceled(Boolean canceled);

  public BookingType getBookingType();

  public void setBookingType(BookingType bookingType);

  public Long getTableId();

  public void setTableId(Long tableId);

  public Long getOrderId();

  public void setOrderId(Long orderId);

  public Integer getAssistants();

  public void setAssistants(Integer assistants);

  public Long getUserId();

  public void setUserId(Long userId);

}
