package com.devonfw.application.mtsj.ordermanagement.common.api;

public interface Address {
	
	public Long getPostCode();
	public void setPostCode(Long postCode);
	public String getCity();
	public void setCity(String city);
	public String getStreetName();
	public void setStreetName(String streetName);
	public Long getHouseNumber();
	public void setHouseNumber(Long houseNumber);

}
