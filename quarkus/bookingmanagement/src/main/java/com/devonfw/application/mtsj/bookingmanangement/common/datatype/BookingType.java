package com.devonfw.application.mtsj.bookingmanangement.common.datatype;

public enum BookingType {

  COMMON, INVITED;

  public boolean isCommon() {

    return (this == COMMON);
  }

  public boolean isInvited() {

    return (this == INVITED);
  }

}
