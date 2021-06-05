package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import java.util.List;

import com.devonfw.module.basic.common.api.to.AbstractCto;

public class OrdersCto extends AbstractCto {

	private static final long serialVersionUID = 1L;

	private List<OrderEto> orders;

	public List<OrderEto> getOrders() {
		return this.orders;
	}

	public void setOrders(List<OrderEto> orders) {
		this.orders = orders;
	}
}
