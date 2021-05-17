package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.OrderPaid;

@Entity
@Table(name = "OrderPaid")
public class OrderPaidEntity extends ApplicationPersistenceEntity implements OrderPaid {
	private String paidName;
	
    /**
	 * @return paidName
	 */
	@Override
	public String getPaidName() {
		return this.paidName;
	}
	
	/**
	 * @return setsPaidName
	 */
	@Override
	public void setPaidName(String paidName) {
		this.paidName = paidName;
	}

}
