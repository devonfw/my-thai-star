package io.oasp.application.mtsj.reservationmanagement.common.api;

import java.sql.Timestamp;

import io.oasp.application.mtsj.general.common.api.ApplicationEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.TableEntity;

public interface Reservation extends ApplicationEntity {

  public long getIdUser();

  public void setIdUser(long idUser);

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

  public int getReservationType();

  public void setReservationType(int reservationType);

  public TableEntity getTable();

  public void setTable(TableEntity idTable);

}
