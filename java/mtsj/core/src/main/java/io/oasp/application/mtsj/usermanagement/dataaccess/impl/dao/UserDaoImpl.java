package io.oasp.application.mtsj.usermanagement.dataaccess.impl.dao;

import java.util.List;

import javax.inject.Named;

import com.querydsl.core.alias.Alias;
import com.querydsl.core.types.dsl.EntityPathBase;
import com.querydsl.jpa.impl.JPAQuery;

import io.oasp.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import io.oasp.application.mtsj.usermanagement.dataaccess.api.dao.UserDao;
import io.oasp.application.mtsj.usermanagement.logic.api.to.UserSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.OrderByTo;
import io.oasp.module.jpa.common.api.to.OrderDirection;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;
import io.oasp.module.jpa.common.base.LegacyApplicationDaoImpl;

/**
 * This is the implementation of {@link UserDao}.
 */
@Named
public class UserDaoImpl extends LegacyApplicationDaoImpl<UserEntity> implements UserDao {

  /**
   * The constructor.
   */
  public UserDaoImpl() {

    super();
  }

  @Override
  public Class<UserEntity> getEntityClass() {

    return UserEntity.class;
  }

  @Override
  public PaginatedListTo<UserEntity> findUsers(UserSearchCriteriaTo criteria) {

    UserEntity user = Alias.alias(UserEntity.class);
    EntityPathBase<UserEntity> alias = Alias.$(user);
    JPAQuery<UserEntity> query = new JPAQuery<UserEntity>(getEntityManager()).from(alias);

    String username = criteria.getUsername();
    if (username != null) {
      query.where(Alias.$(user.getUsername()).toLowerCase().eq(username.toLowerCase()));
    }
    String password = criteria.getPassword();
    if (password != null) {
      query.where(Alias.$(user.getPassword()).toLowerCase().eq(password.toLowerCase()));
    }
    String email = criteria.getEmail();
    if (email != null) {
      query.where(Alias.$(user.getEmail()).toLowerCase().eq(email.toLowerCase()));
    }
    Long userRole = criteria.getUserRoleId();
    if (userRole != null && user.getUserRole() != null) {
      query.where(Alias.$(user.getUserRole().getId()).eq(userRole));
    }
    return findPaginated(criteria, query, alias);
  }

  private void addOrderBy(JPAQuery query, EntityPathBase<UserEntity> alias, UserEntity user, List<OrderByTo> sort) {

    if (sort != null && !sort.isEmpty()) {
      for (OrderByTo orderEntry : sort) {
        if ("username".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(user.getUsername()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(user.getUsername()).toLowerCase().desc());
          }
        } else if ("password".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(user.getPassword()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(user.getPassword()).toLowerCase().desc());
          }
        } else if ("email".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(user.getEmail()).toLowerCase().asc());
          } else {
            query.orderBy(Alias.$(user.getEmail()).toLowerCase().desc());
          }
        } else if ("userRole".equals(orderEntry.getName())) {
          if (OrderDirection.ASC.equals(orderEntry.getDirection())) {
            query.orderBy(Alias.$(user.getUserRoleId()).asc());
          } else {
            query.orderBy(Alias.$(user.getUserRoleId()).desc());
          }
        }
      }
    }
  }

}