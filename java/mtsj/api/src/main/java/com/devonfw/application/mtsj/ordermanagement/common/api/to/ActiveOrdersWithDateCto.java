package com.devonfw.application.mtsj.ordermanagement.common.api.to;

import java.util.List;

public class ActiveOrdersWithDateCto  {

	private List<OrdersEto> content;

	public List<OrdersEto> getContent() {
		return content;
	}

	public void setContent(List<OrdersEto> content) {
		this.content = content;
	}
	
}