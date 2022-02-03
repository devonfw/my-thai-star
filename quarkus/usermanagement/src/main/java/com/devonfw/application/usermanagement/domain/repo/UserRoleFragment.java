package com.devonfw.application.usermanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.domain.model.UserRoleEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserRoleSearchCriteriaDto;

public interface UserRoleFragment {
  public Page<UserRoleEntity> findRolesByCriteria(UserRoleSearchCriteriaDto userSearchCriteria);
}
