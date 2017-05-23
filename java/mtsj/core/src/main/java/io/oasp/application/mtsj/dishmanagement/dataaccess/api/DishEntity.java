package io.oasp.application.mtsj.dishmanagement.dataaccess.api;

import java.math.BigDecimal;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import io.oasp.application.mtsj.dishmanagement.common.api.Dish;
import io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity;
import io.oasp.application.mtsj.imagemanagement.common.api.Image;

/**
 * The {@link io.oasp.application.mtsj.general.dataaccess.api.ApplicationPersistenceEntity persistent entity} for
 * {@link Dish}.
 */
@Entity
@Table(name="Dish")
public class DishEntity extends ApplicationPersistenceEntity implements Dish {

	private static final long serialVersionUID = 1L;

	private String name;

	private String description;

	private BigDecimal price;

	private Long idImage;

	private Image image;

	private List<IngredientEntity> extras;

	private List<CategoryEntity> categories;

	/**
	 * @return name
	 */
	public String getName() {

    return this.name;
  }

	/**
	 * @param name new value of {@link #getName}.
	 */
	public void setName(String name) {

    this.name = name;
  }

	/**
	 * @return description
	 */
	public String getDescription() {

    return this.description;
  }

	/**
	 * @param description new value of {@link #getDescription}.
	 */
	public void setDescription(String description) {

    this.description = description;
  }

	/**
	 * @return price
	 */
	public BigDecimal getPrice() {

    return this.price;
  }

	/**
	 * @param price new value of {@link #getPrice}.
	 */
	public void setPrice(BigDecimal price) {

    this.price = price;
  }

	/**
	 * @return idImage
	 */
	public Long getIdImage() {

    return this.idImage;
  }

	/**
	 * @param idImage new value of {@link #getIdImage}.
	 */
	public void setIdImage(Long idImage) {

    this.idImage = idImage;
  }

	/**
	 * @return image
	 */
	@Transient
	public Image getImage() {

    return this.image;
  }

	/**
	 * @param image new value of {@link #getImage}.
	 */
	@Transient
	public void setImage(Image image) {

    this.image = image;
  }

	/**
	 * @return extras
	 */
	@ManyToMany(fetch=FetchType.EAGER)
	@Column(name="idIngredient")
	@JoinTable(name="DishIngredient",
		joinColumns={@javax.persistence.JoinColumn(name="idDish")},
		inverseJoinColumns=@javax.persistence.JoinColumn(name="idIngredient"))
	public List<IngredientEntity> getExtras() {

    return this.extras;
  }

	/**
	 * @param extras new value of {@link #getExtras}.
	 */
	public void setExtras(List<IngredientEntity> extras) {

    this.extras = extras;
  }

	/**
	 * @return categories
	 */
	@ManyToMany(fetch=FetchType.EAGER)
	@Column(name="idCategory")
	@JoinTable(name="DishCategory",
		joinColumns={@javax.persistence.JoinColumn(name="idDish")},
		inverseJoinColumns=@javax.persistence.JoinColumn(name="idCategory"))
	public List<CategoryEntity> getCategories() {

    return this.categories;
  }

	/**
	 * @param categories new value of {@link #getCategories}.
	 */
	public void setCategories(List<CategoryEntity> categories) {

    this.categories = categories;
  }

}
