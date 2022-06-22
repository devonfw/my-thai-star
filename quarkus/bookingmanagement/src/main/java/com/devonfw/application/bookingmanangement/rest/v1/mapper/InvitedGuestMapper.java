package com.devonfw.application.bookingmanangement.rest.v1.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import com.devonfw.application.bookingmanangement.domain.model.InvitedGuestEntity;
import com.devonfw.application.bookingmanangement.rest.v1.model.InvitedGuestDto;

@Mapper(componentModel = "cdi")
public interface InvitedGuestMapper {

  InvitedGuestDto mapTo(InvitedGuestEntity invitedGuest);

  List<InvitedGuestDto> mapList(List<InvitedGuestEntity> invitedGuests);

  InvitedGuestEntity mapToEntity(InvitedGuestDto invitedGuest);

  List<InvitedGuestEntity> mapToListEntity(List<InvitedGuestDto> invitedGuests);

  default Page<InvitedGuestDto> map(Page<InvitedGuestEntity> guest) {

    List<InvitedGuestDto> guests = mapList(guest.getContent());
    return new PageImpl<>(guests, guest.getPageable(), guest.getTotalElements());
  }
}
