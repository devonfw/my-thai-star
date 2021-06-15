package com.devonfw.application.mtsj.bookingmanagement.common.api.to;

import com.devonfw.application.mtsj.general.common.api.to.AbstractSearchCriteriaTo;

public class WaitersHelpCriteriaTo extends AbstractSearchCriteriaTo { 
	 
	private static final long serialVersionUID = 1L;
	
	private Long tableId;
	private Long waitersHelp;
	private Long bookingId;
	
	public Long getTableId() {
		return tableId;
	}
	public void setTableId(Long tableId) {
		this.tableId = tableId;
	}
	public Long getWaitersHelp() {
		return waitersHelp;
	}
	public void setWaitersHelp(Long waitersHelp) {
		this.waitersHelp = waitersHelp;
	}
	public Long getBookingId() {
		return bookingId;
	}
	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}
	
}
