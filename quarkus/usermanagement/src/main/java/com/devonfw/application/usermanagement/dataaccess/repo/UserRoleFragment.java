package com.devonfw.application.usermanagement.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.common.to.UserRoleSearchCriteriaTo;
import com.devonfw.application.usermanagement.dataaccess.UserRoleEntity;

public interface UserRoleFragment {
  public Page<UserRoleEntity> findByCriteria(UserRoleSearchCriteriaTo userSearchCriteria);
}
