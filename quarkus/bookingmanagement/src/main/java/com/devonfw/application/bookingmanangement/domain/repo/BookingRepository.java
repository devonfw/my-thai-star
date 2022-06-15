package com.devonfw.application.bookingmanangement.domain.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.bookingmanangement.domain.model.BookingEntity;

public interface BookingRepository extends CrudRepository<BookingEntity, Long>, BookingFragment {

  @Query("SELECT booking FROM BookingEntity booking" //
      + " WHERE booking.bookingToken = :token")
  BookingEntity findBookingByToken(@Param("token") String token);
}
