package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import java.util.Iterator;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;
import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.repo.IngredientRepository;

/**
 * This class implements an {@link ItemReader} for {@link IngredientEntity} which uses {@link IngredientRepository} to
 * actually read the items.
 *
 */
@Named
public class IngredientEntityItemReader implements ItemReader<IngredientEntity> {

  @Inject
  private IngredientRepository ingredientRepository;

  private Iterator<IngredientEntity> ingredientIterator;

  @Override
  public IngredientEntity read()
      throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {

    if (this.ingredientIterator == null) {
      this.ingredientIterator = this.ingredientRepository.findAll().iterator();
    }

    if (this.ingredientIterator.hasNext()) {
      return this.ingredientIterator.next();
    } else
      return null;
  }

}
