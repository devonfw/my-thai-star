package com.devonfw.application.bookingmanangement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;

import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;

@Mapper(componentModel = "cdi")
public interface InvitedGuestMapper {

  InvitedGuestDto mapTo(InvitedGuestEntity invitedGuest);

  List<InvitedGuestDto> mapToList(List<InvitedGuestEntity> invitedGuests);

  InvitedGuestEntity mapToEntity(InvitedGuestDto invitedGuest);

  List<InvitedGuestEntity> mapToListEntity(List<InvitedGuestDto> invitedGuests);

}
