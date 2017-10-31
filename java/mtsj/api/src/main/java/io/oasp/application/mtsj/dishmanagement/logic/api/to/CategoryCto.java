package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;
import io.oasp.application.mtsj.dishmanagement.common.api.Category;

import java.util.List;
import java.util.Set;

/**
 * Composite transport object of Category
 */
public class CategoryCto extends AbstractCto {

	private static final long serialVersionUID = 1L;

	private CategoryEto category;


	public CategoryEto getCategory() {
		return category;
	}

	public void setCategory(CategoryEto category) {
		this.category = category;
	}


}
