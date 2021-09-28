package com.devonfw.application.dishmanagement.dataaccess;

import java.math.BigDecimal;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.application.dishmanagement.common.ApplicationPersistenceEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * The {@link ApplicationPersistenceEntity persistent entity} for {@link IngredientEntity}.
 */
@Getter
@Setter
@Entity
@Table(name = "Ingredient")
public class IngredientEntity extends ApplicationPersistenceEntity {

  private String name;

  private String description;

  private BigDecimal price;

}
