package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.ordermanagement.common.api.Address;
import com.devonfw.module.basic.common.api.to.AbstractEto;

public class AddressEto extends AbstractEto implements Address {

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

	@Override
	public int hashCode() {

		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((this.stateOrRegion == null) ? 0 : this.stateOrRegion.hashCode());
		result = prime * result + ((this.city == null) ? 0 : this.city.hashCode());
		result = prime * result + ((this.countryCode == null) ? 0 : this.countryCode.hashCode());
		result = prime * result + ((this.postalCode == null) ? 0 : this.postalCode.hashCode());
		result = prime * result + ((this.addressLine1 == null) ? 0 : this.addressLine1.hashCode());
		result = prime * result + ((this.addressLine2 == null) ? 0 : this.addressLine2.hashCode());
		result = prime * result + ((this.addressLine3 == null) ? 0 : this.addressLine3.hashCode());
		result = prime * result + ((this.districtOrCounty == null) ? 0 : this.districtOrCounty.hashCode());
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
		if (this.stateOrRegion == null) {
			if (other.stateOrRegion != null) {
				return false;
			}
		} else if (!this.stateOrRegion.equals(other.stateOrRegion)) {
			return false;
		}

		if (this.city == null) {
			if (other.city != null) {
				return false;
			}
		} else if (!this.city.equals(other.city)) {
			return false;
		}

		if (this.countryCode == null) {
			if (other.countryCode != null) {
				return false;
			}
		} else if (!this.countryCode.equals(other.countryCode)) {
			return false;
		}

		if (this.postalCode == null) {
			if (other.postalCode != null) {
				return false;
			}
		} else if (!this.postalCode.equals(other.postalCode)) {
			return false;
		}

		if (this.addressLine1 == null) {
			if (other.addressLine1 != null) {
				return false;
			}
		} else if (!this.addressLine1.equals(other.addressLine1)) {
			return false;
		}

		if (this.addressLine2 == null) {
			if (other.addressLine2 != null) {
				return false;
			}
		} else if (!this.addressLine2.equals(other.addressLine2)) {
			return false;
		}

		if (this.addressLine3 == null) {
			if (other.addressLine3 != null) {
				return false;
			}
		} else if (!this.addressLine3.equals(other.addressLine3)) {
			return false;
		}

		if (this.districtOrCounty == null) {
			if (other.districtOrCounty != null) {
				return false;
			}
		} else if (!this.districtOrCounty.equals(other.districtOrCounty)) {
			return false;
		}

		return true;
	}

}
