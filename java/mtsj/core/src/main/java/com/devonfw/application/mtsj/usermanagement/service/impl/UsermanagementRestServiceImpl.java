package com.devonfw.application.mtsj.usermanagement.service.impl;

import javax.inject.Inject;
import javax.inject.Named;

import com.devonfw.application.mtsj.usermanagement.common.api.to.UserEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserQrCodeTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleEto;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserRoleSearchCriteriaTo;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserSearchCriteriaTo;
import org.springframework.data.domain.Page;

import com.devonfw.application.mtsj.usermanagement.logic.api.Usermanagement;
import com.devonfw.application.mtsj.usermanagement.rest.api.UsermanagementRestService;

/**
 * The service implementation for REST calls in order to execute the logic of component {@link Usermanagement}.
 */
@Named("UsermanagementRestService")
public class UsermanagementRestServiceImpl implements UsermanagementRestService {

  @Inject
  private Usermanagement usermanagement;

  @Override
  public UserEto getUser(long id) {

    return this.usermanagement.findUser(id);
  }

  @Override
  public UserQrCodeTo getUserQrCode(String username) {

    return this.usermanagement.generateUserQrCode(username);
  }

  @Override
  public UserEto saveUser(UserEto user) {

    return this.usermanagement.saveUser(user);
  }

  @Override
  public UserEto getUserStatus(String username) {

    return this.usermanagement.getUserStatus(username);
  }

  @Override
  public UserEto saveUserTwoFactor(UserEto user) {

    return this.usermanagement.saveUserTwoFactor(user);
  }

  @Override
  public void deleteUser(long id) {

    this.usermanagement.deleteUser(id);
  }

  @Override
  public Page<UserEto> findUsersByPost(UserSearchCriteriaTo searchCriteriaTo) {

    return this.usermanagement.findUserEtos(searchCriteriaTo);
  }

  @Override
  public UserRoleEto getUserRole(long id) {

    return this.usermanagement.findUserRole(id);
  }

  @Override
  public UserRoleEto saveUserRole(UserRoleEto userrole) {

    return this.usermanagement.saveUserRole(userrole);
  }

  @Override
  public void deleteUserRole(long id) {

    this.usermanagement.deleteUserRole(id);
  }

  @Override
  public Page<UserRoleEto> findUserRolesByPost(UserRoleSearchCriteriaTo searchCriteriaTo) {

    return this.usermanagement.findUserRoleEtos(searchCriteriaTo);
  }

}
