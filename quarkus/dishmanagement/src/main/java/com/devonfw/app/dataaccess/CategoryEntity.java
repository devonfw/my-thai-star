package com.devonfw.app.dataaccess;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.devonfw.app.common.ApplicationPersistenceEntity;

import lombok.Getter;
import lombok.Setter;

/**
 * The {@link com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link CategoryEntity}.
 */
@Getter
@Setter
@Entity
@Table(name = "Category")
public class CategoryEntity extends ApplicationPersistenceEntity {

  private String name;

  private String description;

  private int showOrder;

}
