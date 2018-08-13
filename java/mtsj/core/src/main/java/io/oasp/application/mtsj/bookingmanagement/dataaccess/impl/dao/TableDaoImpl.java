package io.oasp.application.mtsj.bookingmanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.TableEntity;
import io.oasp.application.mtsj.bookingmanagement.dataaccess.api.dao.TableDao;
import io.oasp.application.mtsj.bookingmanagement.logic.api.to.TableSearchCriteriaTo;
import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyDaoQuerySupport;

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
    JPAQuery query = (JPAQuery) new JPAQuery(getEntityManager()).from(alias);

    Integer seatsNumber = criteria.getSeatsNumber();
    if (seatsNumber != null) {
      query.where(Alias.$(table.getSeatsNumber()).eq(seatsNumber));
    }
    return LegacyDaoQuerySupport.findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<TableEntity> alias, TableEntity table, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("seatsNumber".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(table.getSeatsNumber()).asc());
          } else {
            query.orderBy(Alias.$(table.getSeatsNumber()).desc());
          }
        }
      }
    }
  }

}
