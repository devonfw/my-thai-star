package com.devonfw.application.mtsj.bookingmanangement.common.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.devonfw.application.mtsj.bookingmanangement.common.to.InvitedGuestEto;
import com.devonfw.application.mtsj.bookingmanangement.dataaccess.InvitedGuestEntity;

@Mapper(componentModel = "cdi")
public interface InvitedGuestMapper {

  InvitedGuestEto mapTo(InvitedGuestEntity invitedGuest);

  List<InvitedGuestEto> mapToEto(List<InvitedGuestEntity> invitedGuests);

  InvitedGuestEntity mapTo(InvitedGuestEto invitedGuest);

  List<InvitedGuestEntity> mapToEntity(List<InvitedGuestEto> invitedGuests);

}
