package com.devonfw.application.mtsj.ordermanagement.dataaccess.api;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import com.devonfw.application.mtsj.ordermanagement.common.api.WaitersHelp;

@Entity
@Table(name = "WaitersHelp")
public class WaitersHelpEntity extends ApplicationPersistenceEntity implements WaitersHelp {

	private static final long serialVersionUID = 1L;
	private String waitersHelpName;

	/**
	 * @return waitersHelpName
	 */
	public String getWaitersHelpName() {
		return waitersHelpName;
	}

	/**
	 * @return sets waitersHelpName
	 */
	public void setWaitersHelpName(String waitersHelpName) {
		this.waitersHelpName = waitersHelpName;
	}

}