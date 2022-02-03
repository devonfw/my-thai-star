package com.devonfw.application.usermanagement.domain.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.domain.model.UserEntity;
import com.devonfw.application.usermanagement.rest.v1.model.UserSearchCriteriaDto;

public interface UserFragment {
  public Page<UserEntity> findUserByCriteria(UserSearchCriteriaDto userSearchCriteria);
}
