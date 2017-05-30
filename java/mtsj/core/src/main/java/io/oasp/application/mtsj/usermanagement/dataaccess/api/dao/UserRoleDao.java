package io.oasp.application.mtsj.usermanagement.dataaccess.api.dao;

import io.oasp.application.mtsj.general.dataaccess.api.dao.ApplicationDao;
import io.oasp.application.mtsj.usermanagement.dataaccess.api.UserRoleEntity;
import io.oasp.application.mtsj.usermanagement.logic.api.to.UserRoleSearchCriteriaTo;
import io.oasp.module.jpa.common.api.to.PaginatedListTo;

/**
 * Data access interface for UserRole entities
 */
public interface UserRoleDao extends ApplicationDao<UserRoleEntity> {

  /**
   * Finds the {@link UserRoleEntity userroles} matching the given {@link UserRoleSearchCriteriaTo}.
   *
   * @param criteria is the {@link UserRoleSearchCriteriaTo}.
   * @return the {@link PaginatedListTo} with the matching {@link UserRoleEntity} objects.
   */
  PaginatedListTo<UserRoleEntity> findUserRoles(UserRoleSearchCriteriaTo criteria);

}
