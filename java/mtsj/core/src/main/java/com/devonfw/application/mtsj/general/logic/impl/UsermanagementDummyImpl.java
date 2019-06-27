package com.devonfw.application.mtsj.general.logic.impl;

import javax.inject.Inject;
import javax.inject.Named;

import org.springframework.stereotype.Component;

import com.devonfw.application.mtsj.general.common.api.UserProfile;
import com.devonfw.application.mtsj.general.common.api.Usermanagement;
import com.devonfw.application.mtsj.general.common.api.datatype.Role;
import com.devonfw.application.mtsj.general.common.api.to.UserDetailsClientTo;
import com.devonfw.application.mtsj.general.common.base.AbstractBeanMapperSupport;
import com.devonfw.application.mtsj.usermanagement.common.api.to.UserEto;

/**
 * Implementation of {@link Usermanagement}.
 */
@Named
@Component
public class UsermanagementDummyImpl extends AbstractBeanMapperSupport implements Usermanagement {

  @Inject
  private com.devonfw.application.mtsj.usermanagement.logic.api.Usermanagement usermanagementcore;

  @Override
  public UserProfile findUserProfileByLogin(String login) {

    UserEto userEto = this.usermanagementcore.findUserbyName(login);
    // this is only a dummy - please replace with a real implementation
    UserDetailsClientTo profile = new UserDetailsClientTo();
    profile.setId(userEto.getId());
    profile.setName(login);

    profile.setRole(setRole(userEto.getUserRoleId()));
    return profile;
  }

  /**
   * Returns a Role instance from its id
   *
   * @param roleId received from the {@link UserEto constructed in findUserProfileByLogin}
   * @return an instance from {@link Role}
   */
  private Role setRole(long roleId) {

    switch (String.valueOf(roleId).trim()) {
      case "1":
        return Role.WAITER;
      case "0":
        return Role.CUSTOMER;
      case "2":
        return Role.MANAGER;
      default:
        return Role.CUSTOMER;
    }
  }
}
