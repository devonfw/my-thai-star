package io.oasp.application.mtsj.reservationmanagement.common.api;

import java.sql.Timestamp;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import io.oasp.application.mtsj.reservationmanagement.common.api.datatype.ReservationType;

public interface Reservation extends ApplicationEntity {

  public String getName();

  public void setName(String name);

  public String getReservationToken();

  public void setReservationToken(String reservationToken);

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

  public ReservationType getReservationType();

  public void setReservationType(ReservationType reservationType);

  public Long getTableId();

  public void setTableId(Long tableId);

  public String getEmail();

  public void setEmail(String email);

}
