package com.devonfw.application.mtsj.bookingmanangement.dataaccess.repo;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.mtsj.bookingmanangement.dataaccess.BookingEntity;

public interface BookingRepository extends CrudRepository<BookingEntity, Long> {

  @Query("SELECT booking FROM BookingEntity booking" //
      + " WHERE booking.bookingToken = :token")
  BookingEntity findBookingByToken(@Param("token") String token);
}
