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

	private Long postCode;
	private String city;
	private String streetName;
	private Long houseNumber;

	/**
	 * @return postCode
	 */
	public Long getPostCode() {
		return postCode;
	}

	/**
	 * set postCode
	 */
	public void setPostCode(Long postCode) {
		this.postCode = postCode;
	}

	/**
	 * @return city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * set city
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * @return streetName
	 */
	public String getStreetName() {
		return streetName;
	}

	/**
	 * set streetName
	 */
	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	/**
	 * @return houseNumber
	 */
	public Long getHouseNumber() {
		return houseNumber;
	}

	/**
	 * set houseNumber
	 */
	public void setHouseNumber(Long houseNumber) {
		this.houseNumber = houseNumber;
	}

}
