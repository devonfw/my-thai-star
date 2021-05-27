package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingEto;
import com.devonfw.application.mtsj.ordermanagement.common.api.Address;
import com.devonfw.module.basic.common.api.to.AbstractEto;

public class AddressEto extends AbstractEto implements Address {

	private Long postCode;
	private String city;
	private String streetName;
	private Long houseNumber;

	public Long getPostCode() {
		return postCode;
	}

	public void setPostCode(Long postCode) {
		this.postCode = postCode;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStreetName() {
		return streetName;
	}

	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}

	public Long getHouseNumber() {
		return houseNumber;
	}

	public void setHouseNumber(Long houseNumber) {
		this.houseNumber = houseNumber;
	}

	@Override
	public int hashCode() {

		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((this.postCode == null) ? 0 : this.postCode.hashCode());
		result = prime * result + ((this.city == null) ? 0 : this.city.hashCode());
		result = prime * result + ((this.streetName == null) ? 0 : this.streetName.hashCode());
		result = prime * result + ((this.houseNumber == null) ? 0 : this.houseNumber.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {

		if (this == obj) {
			return true;
		}
		if (obj == null) {
			return false;
		}
		// class check will be done by super type EntityTo!
		if (!super.equals(obj)) {
			return false;
		}
		AddressEto other = (AddressEto) obj;
		if (this.postCode == null) {
			if (other.postCode != null) {
				return false;
			}
		} else if (!this.postCode.equals(other.postCode)) {
			return false;
		}

		if (this.city == null) {
			if (other.city != null) {
				return false;
			}
		} else if (!this.city.equals(other.city)) {
			return false;
		}

		if (this.streetName == null) {
			if (other.streetName != null) {
				return false;
			}
		} else if (!this.streetName.equals(other.streetName)) {
			return false;
		}

		if (this.houseNumber == null) {
			if (other.houseNumber != null) {
				return false;
			}
		} else if (!this.houseNumber.equals(other.houseNumber)) {
			return false;
		}

		return true;
	}

}
