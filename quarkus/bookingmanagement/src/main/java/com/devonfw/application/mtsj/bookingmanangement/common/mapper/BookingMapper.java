package com.devonfw.application.mtsj.bookingmanangement.common.mapper;

import java.time.OffsetDateTime;
import java.util.Date;

import org.mapstruct.Mapper;

import com.devonfw.application.mtsj.bookingmanangement.common.to.BookingEto;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.BookingEntity;

@Mapper(componentModel = "cdi", uses = { TableMapper.class, InvitedGuestMapper.class })
public interface BookingMapper {

  default Date map(OffsetDateTime value) {

    if (value == null) {
      return null;
    }
    return new Date(value.toInstant().toEpochMilli());
  }

  BookingEto mapTo(BookingEntity booking);

  BookingEntity mapToEntity(BookingEto booking);

}
