package io.oasp.application.mtsj.platemanagement.dataaccess.impl.dao;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.Category;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.PlateEntity;
import io.oasp.application.mtsj.platemanagement.dataaccess.api.dao.PlateDao;
import io.oasp.application.mtsj.platemanagement.logic.api.to.PlateSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link PlateDao}.
 */
@Named
public class PlateDaoImpl extends ApplicationDaoImpl<PlateEntity> implements PlateDao {

  /**
   * The constructor.
   */
  public PlateDaoImpl() {

    super();
  }

  @Override
  public Class<PlateEntity> getEntityClass() {

    return PlateEntity.class;
  }

  @Override
  public PaginatedListTo<PlateEntity> findPlates(PlateSearchCriteriaTo criteria) {

    PlateEntity plate = Alias.alias(PlateEntity.class);
    EntityPathBase<PlateEntity> alias = Alias.$(plate);

    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String searchBy = criteria.getSearchBy();
    if (searchBy != null) {
      query.where(Alias.$(plate.getName()).contains(searchBy).or(Alias.$(plate.getDescription()).contains(searchBy)));
    }

    BigDecimal price = criteria.getMaxPrice();
    if (price != null) {
      query.where(Alias.$(plate.getPrice()).lt(price));
    }

    PaginatedListTo<PlateEntity> entitiesList = findPaginated(criteria, query, alias);

    Collection<Category> categories = criteria.getCategories();
    if (!categories.isEmpty()) {
      entitiesList = categoryFilter(entitiesList, categories);
    }

    return entitiesList;
  }

  private PaginatedListTo<PlateEntity> categoryFilter(PaginatedListTo<PlateEntity> pl,
      Collection<Category> categories) {

    List<PlateEntity> plateEntities = pl.getResult();
    List<PlateEntity> plateEntitiesF = new ArrayList<>();
    for (PlateEntity plateEntity : plateEntities) {

      List<Category> entityCats = plateEntity.getCategories();
      for (Category entityCat : entityCats) {
        for (Category category : categories) {
          if (category.getId() == entityCat.getId()) {
            if (!plateAlreadyAdded(plateEntitiesF, plateEntity)) {
              plateEntitiesF.add(plateEntity);
              System.out.println("ID: " + plateEntity.getId() + "  NAME: " + plateEntity.getName());
              break;
            }

          }
        }
      }

    }

    return new PaginatedListTo<>(plateEntitiesF, pl.getPagination());
  }

  private boolean plateAlreadyAdded(List<PlateEntity> plateEntitiesFiltered, PlateEntity plateEntity) {

    boolean result = false;
    for (PlateEntity entity : plateEntitiesFiltered) {
      if (entity.getId() == plateEntity.getId()) {
        result = true;
        break;
      }
    }
    return result;
  }

}
