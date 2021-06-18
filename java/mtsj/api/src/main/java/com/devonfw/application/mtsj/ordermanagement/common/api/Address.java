package com.devonfw.application.mtsj.ordermanagement.common.api;

public interface Address {

	public String getStateOrRegion();

	public void setStateOrRegion(String stateOrRegion);

	public String getCity();

	public void setCity(String city);

	public String getCountryCode();

	public void setCountryCode(String countryCode);

	public String getPostalCode();

	public void setPostalCode(String postalCode);

	public String getAddressLine1();

	public void setAddressLine1(String addressLine1);

	public String getAddressLine2();

	public void setAddressLine2(String addressLine2);

	public String getAddressLine3();

	public void setAddressLine3(String addressLine3);

	public String getDistrictOrCounty();

	public void setDistrictOrCounty(String districtOrCounty);

}
