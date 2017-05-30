package io.oasp.application.mtsj.usermanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.mysema.query.alias.Alias;
import com.mysema.query.jpa.impl.JPAQuery;
import com.mysema.query.types.path.EntityPathBase;

import io.oasp.application.mtsj.general.dataaccess.base.dao.ApplicationDaoImpl;
import io.oasp.application.mtsj.usermanagement.dataaccess.api.UserRoleEntity;
import io.oasp.application.mtsj.usermanagement.dataaccess.api.dao.UserRoleDao;
import io.oasp.application.mtsj.usermanagement.logic.api.to.UserRoleSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * This is the implementation of {@link UserRoleDao}.
 */
@Named
public class UserRoleDaoImpl extends ApplicationDaoImpl<UserRoleEntity> implements UserRoleDao {

  /**
   * The constructor.
   */
  public UserRoleDaoImpl() {

    super();
  }

  @Override
  public Class<UserRoleEntity> getEntityClass() {

    return UserRoleEntity.class;
  }

  @Override
  public PaginatedListTo<UserRoleEntity> findUserRoles(UserRoleSearchCriteriaTo criteria) {

    UserRoleEntity userrole = Alias.alias(UserRoleEntity.class);
    EntityPathBase<UserRoleEntity> alias = Alias.$(userrole);
    JPAQuery query = new JPAQuery(getEntityManager()).from(alias);

    String name = criteria.getName();
    if (name != null) {
      query.where(Alias.$(userrole.getName()).eq(name));
    }
    Boolean active = criteria.getActive();
    if (active != null) {
      query.where(Alias.$(userrole.getActive()).eq(active));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<UserRoleEntity> alias, UserRoleEntity userrole,
      List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("name".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(userrole.getName()).asc());
          } else {
            query.orderBy(Alias.$(userrole.getName()).desc());
          }
        } else if ("active".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(userrole.getActive()).asc());
          } else {
            query.orderBy(Alias.$(userrole.getActive()).desc());
          }
        }
      }
    }
  }

}
