package com.devonfw.application.bookingmanangement.domain.model;

public enum BookingType {

  COMMON, INVITED;

  public boolean isCommon() {

    return (this == COMMON);
  }

  public boolean isInvited() {

    return (this == INVITED);
  }

}
