package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import com.devonfw.application.mtsj.ordermanagement.common.api.OrderState;
import com.devonfw.module.basic.common.api.to.AbstractEto;

public class OrderPaidEto extends AbstractEto implements OrderState {

	private static final long serialVersionUID = 1L;

	private String paidName;

	@Override
	public String getStateName() {
		return this.paidName;
	}

	@Override
	public void setStateName(String paidName) {
		this.paidName = paidName;

	}

	@Override
	public int hashCode() {

		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + ((this.paidName == null) ? 0 : this.paidName.hashCode());
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
		OrderPaidEto other = (OrderPaidEto) obj;
		if (this.paidName == null) {
			if (other.paidName != null) {
				return false;
			}
		} else if (!this.paidName.equals(other.paidName)) {
			return false;
		}
		return true;
	}

}
