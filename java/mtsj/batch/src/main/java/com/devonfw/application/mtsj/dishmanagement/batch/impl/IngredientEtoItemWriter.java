package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.batch.item.ItemWriter;

import com.devonfw.application.mtsj.dishmanagement.common.api.to.IngredientEto;
import com.devonfw.application.mtsj.dishmanagement.logic.api.Dishmanagement;

/**
 * This class implements an {@link ItemWriter} which writes {@link IngredientEto} using the 'Save Ingredient' use case
 * of {@link Dishmanagement}.
 *
 */
public class IngredientEtoItemWriter implements ItemWriter<IngredientEto> {

  @Inject
  private Dishmanagement dishmanagement;

  @Override
  public void write(List<? extends IngredientEto> items) throws Exception {

    for (IngredientEto ingredient : items) {
      this.dishmanagement.saveIngredient(ingredient);
    }

  }

}
