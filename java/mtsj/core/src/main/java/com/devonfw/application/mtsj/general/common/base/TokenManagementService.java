package com.devonfw.application.mtsj.general.common.base;

import java.util.List;

import javax.inject.Inject;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.devonfw.application.mtsj.general.common.api.datatype.Role;
import com.devonfw.application.mtsj.general.common.api.to.UserDetailsClientTo;
import com.devonfw.module.security.jwt.common.api.JwtAuthenticator;

/**
 * Retrieves principal and authorities from token
 *
 */
@Component
public class TokenManagementService {

  @Inject
  private JwtAuthenticator jwtAuthenticator;

  /**
   *
   * Retrieves principal and authorities from token
   *
   * @param jwt
   * @return
   */
  public UserDetailsClientTo getUserdetailsFromTokenJwt(String jwt) {

    UserDetailsClientTo userDetails = new UserDetailsClientTo();
    Authentication auth = this.jwtAuthenticator.authenticate(jwt);
    userDetails.setName(auth.getPrincipal().toString());
    List<GrantedAuthority> listRoles = (List<GrantedAuthority>) auth.getAuthorities();
    for (GrantedAuthority grantedAuth : listRoles) {
      String role = grantedAuth.getAuthority();
      if (role.equalsIgnoreCase(Role.WAITER.getName())) {
        userDetails.setRole(Role.WAITER);

      } else if (role.equalsIgnoreCase(Role.CUSTOMER.getName())) {
        userDetails.setRole(Role.CUSTOMER);
      } else if (role.equalsIgnoreCase(Role.MANAGER.getName())) {
        userDetails.setRole(Role.MANAGER);
      }

    }
    return userDetails;
  }

}
