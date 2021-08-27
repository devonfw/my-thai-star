package com.devonfw.application.mtsj.bookingmanangement.common.to;

import java.util.List;

import javax.validation.Valid;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookingCto {

  private static final long serialVersionUID = 1L;

  @Valid
  private BookingEto booking;

  private TableEto table;

  private List<InvitedGuestEto> invitedGuests;

  /*
   * private OrderEto order;
   *
   * private List<OrderEto> orders;
   *
   * private UserEto user;
   */

}
