package io.oasp.application.mtsj.dishmanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.dishmanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.DishEntity;
import io.oasp.application.mtsj.dishmanagement.dataaccess.api.dao.DishDao;
import io.oasp.application.mtsj.dishmanagement.logic.api.to.DishSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
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

    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String searchBy = criteria.getSearchBy();
    if (searchBy != null) {
      query.where(Alias.$(dish.getName()).contains(searchBy).or(Alias.$(dish.getDescription()).contains(searchBy)));
    }

    BigDecimal price = criteria.getMaxPrice();
    if (price != null) {
      query.where(Alias.$(dish.getPrice()).lt(price));
    }

    addOrderBy(query, alias, dish, criteria.getSort());
    PaginatedListTo<DishEntity> entitiesList = findPaginated(criteria, query, alias);

    Collection<Category> categories = criteria.getCategories();
    if (!categories.isEmpty()) {
      entitiesList = categoryFilter(entitiesList, categories);
    }

    return entitiesList;
  }

  private PaginatedListTo<DishEntity> categoryFilter(PaginatedListTo<DishEntity> pl, Collection<Category> categories) {

    List<DishEntity> dishEntities = pl.getResult();
    List<DishEntity> dishEntitiesF = new ArrayList<>();
    for (DishEntity dishEntity : dishEntities) {

      List<Category> entityCats = dishEntity.getCategories();
      for (Category entityCat : entityCats) {
        for (Category category : categories) {
          if (category.getId() == entityCat.getId()) {
            if (!dishAlreadyAdded(dishEntitiesF, dishEntity)) {
              dishEntitiesF.add(dishEntity);
              break;
            }

          }
        }
      }

    }

    return new PaginatedListTo<>(dishEntitiesF, pl.getPagination());
  }

  private boolean dishAlreadyAdded(List<DishEntity> dishEntitiesFiltered, DishEntity dishEntity) {

    boolean result = false;
    for (DishEntity entity : dishEntitiesFiltered) {
      if (entity.getId() == dishEntity.getId()) {
        result = true;
        break;
      }
    }
    return result;
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<DishEntity> alias, DishEntity plate, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(plate.getName()).asc());
          } else {
            query.orderBy(Alias.$(plate.getName()).desc());
          }
        } else if ("description".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(plate.getDescription()).asc());
          } else {
            query.orderBy(Alias.$(plate.getDescription()).desc());
          }
        } else if ("price".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(plate.getPrice()).asc());
          } else {
            query.orderBy(Alias.$(plate.getPrice()).desc());
          }
        }
      }
    }
  }

}
