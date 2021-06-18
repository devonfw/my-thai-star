package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import java.time.Instant;
import java.util.List;

public class OrdersEto {
	
	private List<OrderEto> orders;
	private Instant creationDate;

	public List<OrderEto> getOrders() {
		return this.orders;
	}

	public void setOrders(List<OrderEto> orders) {
		this.orders = orders;
	}

	public Instant getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Instant creationDate) {
		this.creationDate = creationDate;
	}

}
