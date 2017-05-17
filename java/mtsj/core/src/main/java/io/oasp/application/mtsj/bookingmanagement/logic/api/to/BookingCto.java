package io.oasp.application.mtsj.bookingmanagement.logic.api.to;

import io.oasp.application.mtsj.bookingmanagement.common.api.datatype.BookingType;
import io.oasp.application.mtsj.general.common.api.to.AbstractCto;

/**
 * Composite transport object of Booking
 */
public class BookingCto extends AbstractCto {

  private static final long serialVersionUID = 1L;

  private BookingEto book;

  private BookingType bookType;

  private TableEto table;

  public BookingEto getBooking() {

    return this.book;
  }

  public void setBooking(BookingEto book) {

    this.book = book;
  }

  public BookingType getBookingType() {

    return this.bookType;
  }

  public void setBookingType(BookingType bookType) {

    this.bookType = bookType;
  }

  public TableEto getTable() {

    return this.table;
  }

  public void setTable(TableEto table) {

    this.table = table;
  }

}
