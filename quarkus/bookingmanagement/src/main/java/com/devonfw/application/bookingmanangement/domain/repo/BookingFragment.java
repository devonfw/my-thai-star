package com.devonfw.application.bookingmanangement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.BookingSearchCriteriaTo;

public interface BookingFragment {
  Page<BookingEntity> findBookingsByCriteria(BookingSearchCriteriaTo criteria);
}
