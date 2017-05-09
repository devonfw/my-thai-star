package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link DishDao}.
 */
@Named
public class DishDaoImpl extends ApplicationDaoImpl<DishEntity> implements DishDao {

  /**
   * The constructor.
   */
  public DishDaoImpl() {

    super();
  }

  @Override
  public Class<DishEntity> getEntityClass() {

    return DishEntity.class;
  }

  @Override
  public PaginatedListTo<DishEntity> findDishs(DishSearchCriteriaTo criteria) {

    DishEntity dish = Alias.alias(DishEntity.class);
    EntityPathBase<DishEntity> alias = Alias.$(dish);
    Category category = Alias.alias(Category.class);
    EntityPathBase<Category> aliasC = Alias.$(category);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(dish.getName()).eq(name));
    }
    String description = criteria.getDescription();
    if (description != null) {
      query.where(Alias.$(dish.getDescription()).eq(description));
    }
    BigDecimal price = criteria.getPrice();
    if (price != null) {
      query.where(Alias.$(dish.getPrice()).eq(price));
    }
    String image = criteria.getImage();
    if (image != null) {
      query.where(Alias.$(dish.getImage()).eq(image));
    }
    // Collection<Category> categories = criteria.getCategories();
    // if (categories.size() > 0){
    // query.innerJoin()
    // for (Category c : categories) {
    // query.innerJoin(criteria.getCategories(), category)
    // }
    // }
    return findPaginated(criteria, query, alias);
  }

}
