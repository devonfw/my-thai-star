package com.devonfw.application.mtsj.general.common;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.module.security.common.api.accesscontrol.AccessControl;
import com.devonfw.module.security.common.base.accesscontrol.AccessControlGrantedAuthority;

/**
 * This is a utility for testing. It allows to simulate authentication for component testing.
 *
 */
public class TestUtil {

  /**
   * @param login the id of the user to run the test as.
   * @param permissions the permissions for the test.
   */
  public static void login(String login, String... permissions) {

    ApplicationAccessControlConfig accessControlConfig = new ApplicationAccessControlConfig();
    List<GrantedAuthority> authorities = new ArrayList<>();
    Set<AccessControl> accessControlSet = new HashSet<>();
    for (String id : permissions) {
      boolean success = accessControlConfig.collectAccessControls(id, accessControlSet);
      if (!success) {
      }
    }
    for (AccessControl accessControl : accessControlSet) {
      authorities.add(new AccessControlGrantedAuthority(accessControl));
    }
    Authentication authentication = new TestingAuthenticationToken(login, login, authorities);
    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  /**
   * Logs off any {@link #login(String, String...) previously logged on user}.
   */
  public static void logout() {

    SecurityContextHolder.getContext().setAuthentication(null);
  }

}
