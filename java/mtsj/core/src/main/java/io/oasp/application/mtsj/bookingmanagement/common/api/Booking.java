package io.oasp.application.mtsj.bookingmanagement.common.api;

import java.sql.Timestamp;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.general.common.api.ApplicationEntity;

public interface Booking extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getBookingToken();

  public void setBookingToken(String bookToken);

  public String getComment();

  public void setComment(String comment);

  public Timestamp getBookingDate();

  public void setBookingDate(Timestamp bookingDate);

  public Timestamp getExpirationDate();

  public void setExpirationDate(Timestamp expirationDate);

  public Timestamp getCreationDate();

  public void setCreationDate(Timestamp creationDate);

  public boolean isCanceled();

  public void setCanceled(boolean canceled);

  public BookingType getBookingType();

  public void setBookingType(BookingType bookType);

  public Long getTableId();

  public void setTableId(Long tableId);

  public String getEmail();

  public void setEmail(String email);

}
