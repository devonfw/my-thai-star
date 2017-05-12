package io.oasp.application.mtsj.reservationmanagement.logic.api.to;

import java.sql.Timestamp;

import io.oasp.application.mtsj.general.common.api.to.AbstractEto;
import io.oasp.application.mtsj.reservationmanagement.common.api.Reservation;

/**
 * Entity transport object of Reservation
 */
public class ReservationEto extends AbstractEto implements Reservation {

  private static final long serialVersionUID = 1L;

  private long idUser;

  private String name;

  private String reservationToken;

  private String comment;

  private Timestamp bookingDate;

  private Timestamp expirationDate;

  private Timestamp creationDate;

  private boolean canceled;

  private int reservationType;

  private long idTable;

  @Override
  public long getIdUser() {

    return this.idUser;
  }

  @Override
  public void setIdUser(long idUser) {

    this.idUser = idUser;
  }

  @Override
  public String getName() {

    return this.name;
  }

  @Override
  public void setName(String name) {

    this.name = name;
  }

  @Override
  public String getReservationToken() {

    return this.reservationToken;
  }

  @Override
  public void setReservationToken(String reservationToken) {

    this.reservationToken = reservationToken;
  }

  @Override
  public String getComment() {

    return this.comment;
  }

  @Override
  public void setComment(String comment) {

    this.comment = comment;
  }

  @Override
  public Timestamp getBookingDate() {

    return this.bookingDate;
  }

  @Override
  public void setBookingDate(Timestamp bookingDate) {

    this.bookingDate = bookingDate;
  }

  @Override
  public Timestamp getExpirationDate() {

    return this.expirationDate;
  }

  @Override
  public void setExpirationDate(Timestamp expirationDate) {

    this.expirationDate = expirationDate;
  }

  @Override
  public Timestamp getCreationDate() {

    return this.creationDate;
  }

  @Override
  public void setCreationDate(Timestamp creationDate) {

    this.creationDate = creationDate;
  }

  @Override
  public boolean isCanceled() {

    return this.canceled;
  }

  @Override
  public void setCanceled(boolean canceled) {

    this.canceled = canceled;
  }

  @Override
  public int getReservationType() {

    return this.reservationType;
  }

  @Override
  public void setReservationType(int reservationType) {

    this.reservationType = reservationType;
  }

  @Override
  public long getIdTable() {

    return this.idTable;
  }

  @Override
  public void setIdTable(long idTable) {

    this.idTable = idTable;
  }

  @Override
  public int hashCode() {

    final int prime = 31;
    int result = super.hashCode();
    result = prime * result + ((Long) this.idUser).hashCode();
    result = prime * result + ((this.name == null) ? 0 : this.name.hashCode());
    result = prime * result + ((this.reservationToken == null) ? 0 : this.reservationToken.hashCode());
    result = prime * result + ((this.comment == null) ? 0 : this.comment.hashCode());
    result = prime * result + ((this.bookingDate == null) ? 0 : this.bookingDate.hashCode());
    result = prime * result + ((this.expirationDate == null) ? 0 : this.expirationDate.hashCode());
    result = prime * result + ((this.creationDate == null) ? 0 : this.creationDate.hashCode());
    result = prime * result + ((Boolean) this.canceled).hashCode();
    result = prime * result + ((Integer) this.reservationType).hashCode();
    result = prime * result + ((Long) this.idTable).hashCode();
    return result;
  }

  @Override
  public boolean equals(Object obj) {

    if (this == obj) {
      return true;
    }
    if (obj == null) {
      return false;
    }
    // class check will be done by super type EntityTo!
    if (!super.equals(obj)) {
      return false;
    }
    ReservationEto other = (ReservationEto) obj;
    if (this.idUser != other.idUser) {
      return false;
    }
    if (this.name == null) {
      if (other.name != null) {
        return false;
      }
    } else if (!this.name.equals(other.name)) {
      return false;
    }
    if (this.reservationToken == null) {
      if (other.reservationToken != null) {
        return false;
      }
    } else if (!this.reservationToken.equals(other.reservationToken)) {
      return false;
    }
    if (this.comment == null) {
      if (other.comment != null) {
        return false;
      }
    } else if (!this.comment.equals(other.comment)) {
      return false;
    }
    if (this.bookingDate == null) {
      if (other.bookingDate != null) {
        return false;
      }
    } else if (!this.bookingDate.equals(other.bookingDate)) {
      return false;
    }
    if (this.expirationDate == null) {
      if (other.expirationDate != null) {
        return false;
      }
    } else if (!this.expirationDate.equals(other.expirationDate)) {
      return false;
    }
    if (this.creationDate == null) {
      if (other.creationDate != null) {
        return false;
      }
    } else if (!this.creationDate.equals(other.creationDate)) {
      return false;
    }
    if (this.canceled != other.canceled) {
      return false;
    }
    if (this.reservationType != other.reservationType) {
      return false;
    }
    if (this.idTable != other.idTable) {
      return false;
    }
    return true;
  }
}
