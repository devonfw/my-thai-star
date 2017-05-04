package io.oasp.application.mtsj.general.logic.impl;

import io.oasp.application.mtsj.general.common.api.UserProfile;
import io.oasp.application.mtsj.general.common.api.Usermanagement;
import io.oasp.application.mtsj.general.common.api.datatype.Role;
import io.oasp.application.mtsj.general.common.api.to.UserDetailsClientTo;
import io.oasp.application.mtsj.general.common.base.AbstractBeanMapperSupport;

import javax.inject.Named;

import org.springframework.stereotype.Component;

/**
 * Implementation of {@link Usermanagement}.
 */
@Named
@Component
public class UsermanagementDummyImpl extends AbstractBeanMapperSupport implements Usermanagement {

  @Override
  public UserProfile findUserProfileByLogin(String login) {
    // this is only a dummy - please replace with a real implementation
    UserDetailsClientTo profile = new UserDetailsClientTo();
    profile.setName(login);
    profile.setFirstName("Peter");
    profile.setLastName(login);
    profile.setRole(Role.CHIEF);
    return profile;
  }

}
