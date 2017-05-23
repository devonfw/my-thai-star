package io.oasp.application.mtsj.bookingmanagement.dataaccess.api;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Transient;

import io.oasp.application.mtsj.bookingmanagement.common.api.Booking;
import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;

@Entity
@javax.persistence.Table(name = "Booking")
public class BookingEntity extends ApplicationPersistenceEntity implements Booking {

  private String name;

  private String bookingToken;

  private String comment;

  private Timestamp bookingDate;

  private Timestamp expirationDate;

  private Timestamp creationDate;

  private String email;

  private Boolean canceled;

  private BookingType bookingType;

  private TableEntity table;

  private List<InvitedGuestEntity> invitedGuests;

  private static final long serialVersionUID = 1L;

  public BookingEntity() {

    super();
    this.canceled = false;
  }

  /**
   * @return name
   */
  @Override
  public String getName() {

    return this.name;
  }

  /**
   * @param name new value of {@link #getname}.
   */
  @Override
  public void setName(String name) {

    this.name = name;
  }

  /**
   * @return bookingToken
   */
  @Override
  public String getBookingToken() {

    return this.bookingToken;
  }

  /**
   * @param bookingToken new value of {@link #getbookingToken}.
   */
  @Override
  public void setBookingToken(String bookingToken) {

    this.bookingToken = bookingToken;
  }

  /**
   * @return comments
   */
  @Override
  public String getComment() {

    return this.comment;
  }

  /**
   * @param comments new value of {@link #getcomments}.
   */
  @Override
  public void setComment(String comments) {

    this.comment = comments;
  }

  /**
   * @return bookingDate
   */
  @Override
  public Timestamp getBookingDate() {

    return this.bookingDate;
  }

  /**
   * @param bookingDate new value of {@link #getbookingDate}.
   */
  @Override
  public void setBookingDate(Timestamp bookingDate) {

    this.bookingDate = bookingDate;
  }

  /**
   * @return expirationDate
   */
  @Override
  public Timestamp getExpirationDate() {

    return this.expirationDate;
  }

  /**
   * @param expirationDate new value of {@link #getexpirationDate}.
   */
  @Override
  public void setExpirationDate(Timestamp expirationDate) {

    this.expirationDate = expirationDate;
  }

  /**
   * @return creationDate
   */
  @Override
  public Timestamp getCreationDate() {

    return this.creationDate;
  }

  /**
   * @param creationDate new value of {@link #getcreationDate}.
   */
  @Override
  public void setCreationDate(Timestamp creationDate) {

    this.creationDate = creationDate;
  }

  /**
   * @return canceled
   */
  @Override
  public Boolean getCanceled() {

    return this.canceled;
  }

  /**
   * @param canceled new value of {@link #getcanceled}.
   */
  @Override
  public void setCanceled(Boolean canceled) {

    this.canceled = canceled;
  }

  /**
   * @return table
   */
  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "idTable")
  public TableEntity getTable() {

    return this.table;
  }

  /**
   * @param table new value of {@link #gettable}.
   */
  public void setTable(TableEntity table) {

    this.table = table;
  }

  /**
   * @return invitedGuests
   */
  @OneToMany(mappedBy = "booking", fetch = FetchType.EAGER)
  public List<InvitedGuestEntity> getInvitedGuests() {

    return this.invitedGuests;
  }

  /**
   * @param invitedGuests new value of {@link #getinvitedGuests}.
   */
  public void setInvitedGuests(List<InvitedGuestEntity> invitedGuests) {

    this.invitedGuests = invitedGuests;
  }

  /**
   * @return type
   */
  @Override
  public BookingType getBookingType() {

    return this.bookingType;
  }

  /**
   * @param type new value of {@link #gettype}.
   */
  @Override
  public void setBookingType(BookingType bookingType) {

    this.bookingType = bookingType;
  }

  @Override
  public String getEmail() {

    return this.email;
  }

  @Override
  public void setEmail(String email) {

    this.email = email;

  }

  @Override
  @Transient
  public Long getTableId() {

    if (this.table == null) {
      return null;
    }
    return this.table.getId();
  }

  @Override
  public void setTableId(Long tableId) {

    if (tableId == null) {
      this.table = null;
    } else {
      TableEntity tableEntity = new TableEntity();
      tableEntity.setId(tableId);
      this.table = tableEntity;
    }
  }

}
