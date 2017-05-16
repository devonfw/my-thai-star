package io.oasp.application.mtsj.reservationmanagement.dataaccess.impl.dao;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.ReservationTypeEntity;
import io.oasp.application.mtsj.reservationmanagement.dataaccess.api.dao.ReservationTypeDao;
import io.oasp.application.mtsj.reservationmanagement.logic.api.to.ReservationTypeSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link ReservationTypeDao}.
 */
@Named
public class ReservationTypeDaoImpl extends ApplicationDaoImpl<ReservationTypeEntity> implements ReservationTypeDao {

  /**
   * The constructor.
   */
  public ReservationTypeDaoImpl() {

    super();
  }

  @Override
  public Class<ReservationTypeEntity> getEntityClass() {

    return ReservationTypeEntity.class;
  }

  @Override
  public PaginatedListTo<ReservationTypeEntity> findReservationTypes(ReservationTypeSearchCriteriaTo criteria) {

    ReservationTypeEntity reservationtype = Alias.alias(ReservationTypeEntity.class);
    EntityPathBase<ReservationTypeEntity> alias = Alias.$(reservationtype);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(reservationtype.getName()).eq(name));
    }
    return findPaginated(criteria, query, alias);
  }

}