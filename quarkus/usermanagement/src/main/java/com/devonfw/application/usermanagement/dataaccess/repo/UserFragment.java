package com.devonfw.application.usermanagement.dataaccess.repo;

import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.common.to.UserSearchCriteriaTo;
import com.devonfw.application.usermanagement.dataaccess.UserEntity;

public interface UserFragment {
  public Page<UserEntity> findByCriteria(UserSearchCriteriaTo userSearchCriteria);
}
