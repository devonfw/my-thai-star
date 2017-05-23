package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;
import io.oasp.application.mtsj.dishmanagement.common.api.Dish;

import java.util.List;
import java.util.Set;

/**
 * Composite transport object of Dish
 */
public class DishCto extends AbstractCto {

	private static final long serialVersionUID = 1L;

	private DishEto dish;

   	private List<IngredientEto> extras;
   	private List<CategoryEto> categories;

	public DishEto getDish() {
		return dish;
	}

	public void setDish(DishEto dish) {
		this.dish = dish;
	}

	
	public List<IngredientEto> getExtras() {
		return extras;
	}

	public void setExtras(List<IngredientEto> extras) {
		this.extras = extras;
	}
	
	public List<CategoryEto> getCategories() {
		return categories;
	}

	public void setCategories(List<CategoryEto> categories) {
		this.categories = categories;
	}

}
