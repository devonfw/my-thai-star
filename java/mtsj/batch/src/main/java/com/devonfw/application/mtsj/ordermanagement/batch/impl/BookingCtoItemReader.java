package com.devonfw.application.mtsj.ordermanagement.batch.impl;

import java.util.Iterator;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.batch.item.data.AbstractPaginatedDataItemReader;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.ClassUtils;

import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingCto;
import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingSearchCriteriaTo;
import com.devonfw.application.mtsj.bookingmanagement.logic.api.Bookingmanagement;

/**
 * @author simon
 *
 */
@Named
public class BookingCtoItemReader extends AbstractPaginatedDataItemReader<BookingCto> {

  @Inject
  private Bookingmanagement bookingmanagement;

  public BookingCtoItemReader() {

    setName(ClassUtils.getShortName(BookingCtoItemReader.class));
  }

  @Override
  protected Iterator<BookingCto> doPageRead() {

    BookingSearchCriteriaTo criteria = new BookingSearchCriteriaTo();
    criteria.setPageable(PageRequest.of(this.page, this.pageSize));
    Page<BookingCto> result = this.bookingmanagement.findBookingsByPost(criteria);
    if (result != null) {
      return result.iterator();
    } else {
      return null;
    }
  }

}
