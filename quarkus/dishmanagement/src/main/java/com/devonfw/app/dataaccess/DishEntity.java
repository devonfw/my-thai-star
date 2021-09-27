package com.devonfw.app.dataaccess;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.devonfw.app.common.ApplicationPersistenceEntity;

/**
 * The {@link com.devonfw.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Dish}.
 */
@Entity
@Table(name = "Dish")
public class DishEntity extends ApplicationPersistenceEntity {

  private String name;

  private String description;

  private BigDecimal price;

  // TODO- MS communication
  // private ImageEntity image;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "DishIngredient", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idIngredient"))
  private List<IngredientEntity> extras;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(name = "DishCategory", joinColumns = {
  @javax.persistence.JoinColumn(name = "idDish") }, inverseJoinColumns = @javax.persistence.JoinColumn(name = "idCategory"))
  private List<CategoryEntity> categories;

  // /**
  // * @return image
  // */
  // @OneToOne
  // @JoinColumn(name = "idImage")
  // public ImageEntity getImage() {
  //
  // return this.image;
  // }
  //
  // /**
  // * @param image new value of {@link #getImage}.
  // */
  // public void setImage(ImageEntity image) {
  //
  // this.image = image;
  // }

  // @Override
  // @Transient
  // public Long getImageId() {
  //
  // if (this.image == null) {
  // return null;
  // }
  // return this.image.getId();
  // }
  //
  // @Override
  // public void setImageId(Long imageId) {
  //
  // if (imageId == null) {
  // this.image = null;
  // } else {
  // ImageEntity imageEntity = new ImageEntity();
  // imageEntity.setId(imageId);
  // this.image = imageEntity;
  // }
  // }

}
