package com.devonfw.application.mtsj.bookingmanagement.common.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;

/**
 * used to find {@link com.devonfw.application.mtsj.bookingmanagement.common.api.Table}s.
 */
public class TableSearchCriteriaTo extends AbstractSearchCriteriaTo {

  private static final long serialVersionUID = 1L;

  private Integer seatsNumber;

  private String deviceId;

  /**
   * @return deviceId
   */
  public String getDeviceId() {

    return this.deviceId;
  }

  /**
   * @param deviceId new value of {@link #getdeviceId}.
   */
  public void setDeviceId(String deviceId) {

    this.deviceId = deviceId;
  }

  /**
   * The constructor.
   */
  public TableSearchCriteriaTo() {

    super();
  }

  public Integer getSeatsNumber() {

    return this.seatsNumber;
  }

  public void setSeatsNumber(Integer seatsNumber) {

    this.seatsNumber = seatsNumber;
  }

}
