package com.devonfw.application.usermanagement.dataaccess.repo;

import javax.inject.Inject;
import javax.persistence.EntityManager;

import org.springframework.data.domain.Page;

import com.devonfw.application.usermanagement.common.to.UserSearchCriteriaTo;
import com.devonfw.application.usermanagement.dataaccess.UserEntity;

public class UserRoleFragmentImpl implements UserFragment {

  @Inject
  EntityManager em;

  @Override
  public Page<UserEntity> findByCriteria(UserSearchCriteriaTo userSearchCriteria) {

    // TODO Auto-generated method stub
    return null;
  }

}
