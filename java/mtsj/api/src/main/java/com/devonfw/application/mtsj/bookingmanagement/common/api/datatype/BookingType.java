package com.devonfw.application.mtsj.bookingmanagement.common.api.datatype;

/**
 * @author rudiazma
 *
 */
public enum BookingType {

  COMMON, INVITED;

  public boolean isCommon() {

    return (this == COMMON);
  }

  public boolean isInvited() {

    return (this == INVITED);
  }

}
