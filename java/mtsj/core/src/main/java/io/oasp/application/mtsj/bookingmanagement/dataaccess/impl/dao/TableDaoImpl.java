package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.TableDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link TableDao}.
 */
@Named
public class TableDaoImpl extends ApplicationDaoImpl<TableEntity> implements TableDao {

  /**
   * The constructor.
   */
  public TableDaoImpl() {

    super();
  }

  @Override
  public Class<TableEntity> getEntityClass() {

    return TableEntity.class;
  }

  @Override
  public PaginatedListTo<TableEntity> findTables(TableSearchCriteriaTo criteria) {

    TableEntity table = Alias.alias(TableEntity.class);
    EntityPathBase<TableEntity> alias = Alias.$(table);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    int seatsNumber = criteria.getSeatsNumber();
    query.where(Alias.$(table.getSeatsNumber()).eq(seatsNumber));
    return findPaginated(criteria, query, alias);
  }

}