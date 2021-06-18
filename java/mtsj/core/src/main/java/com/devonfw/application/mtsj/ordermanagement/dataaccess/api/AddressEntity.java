package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.Address;

/**
 * The
 * {@link com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity
 * persistent entity} for {@link Address}.
 */
@Entity
@Table(name = "AddressTable")
public class AddressEntity extends ApplicationPersistenceEntity implements Address {

	private static final long serialVersionUID = 1L;
	
	private String stateOrRegion;
	private String city;
	private String countryCode;
	private String postalCode;
	private String addressLine1;
	private String addressLine2;
	private String addressLine3;
	private String districtOrCounty;

	public String getStateOrRegion() {
		return stateOrRegion;
	}

	public void setStateOrRegion(String stateOrRegion) {
		this.stateOrRegion = stateOrRegion;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getCountryCode() {
		return countryCode;
	}

	public void setCountryCode(String countryCode) {
		this.countryCode = countryCode;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	public String getAddressLine1() {
		return addressLine1;
	}

	public void setAddressLine1(String addressLine1) {
		this.addressLine1 = addressLine1;
	}

	public String getAddressLine2() {
		return addressLine2;
	}

	public void setAddressLine2(String addressLine2) {
		this.addressLine2 = addressLine2;
	}

	public String getAddressLine3() {
		return addressLine3;
	}

	public void setAddressLine3(String addressLine3) {
		this.addressLine3 = addressLine3;
	}

	public String getDistrictOrCounty() {
		return districtOrCounty;
	}

	public void setDistrictOrCounty(String districtOrCounty) {
		this.districtOrCounty = districtOrCounty;
	}

}
