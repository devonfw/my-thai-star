package com.devonfw.application.bookingmanangement.domain.repo;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;

public interface InvitedGuestRepository extends CrudRepository<InvitedGuestEntity, Long>, InvitedGuestFragment {
  @Query("SELECT invitedGuest FROM InvitedGuestEntity invitedGuest" //
      + " WHERE invitedGuest.guestToken = :token")
  InvitedGuestEntity findInvitedGuestByToken(@Param("token") String token);

  @Query("SELECT invitedGuest FROM InvitedGuestEntity invitedGuest" //
      + " WHERE invitedGuest.booking.id = :idBooking")
  List<InvitedGuestEntity> findInvitedGuestByBookingById(@Param("idBooking") Long idBooking);

}
