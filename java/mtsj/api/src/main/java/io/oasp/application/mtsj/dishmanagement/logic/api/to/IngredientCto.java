package io.oasp.application.mtsj.dishmanagement.logic.api.to;

import io.oasp.application.mtsj.general.common.api.to.AbstractCto;
import io.oasp.application.mtsj.dishmanagement.common.api.Ingredient;

import java.util.List;
import java.util.Set;

/**
 * Composite transport object of Ingredient
 */
public class IngredientCto extends AbstractCto {

	private static final long serialVersionUID = 1L;

	private IngredientEto ingredient;


	public IngredientEto getIngredient() {
		return ingredient;
	}

	public void setIngredient(IngredientEto ingredient) {
		this.ingredient = ingredient;
	}


}
