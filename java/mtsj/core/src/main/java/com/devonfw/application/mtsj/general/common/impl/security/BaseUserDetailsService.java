package com.devonfw.application.mtsj.general.common.impl.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.inject.Inject;
import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.devonfw.application.mtsj.general.common.api.UserProfile;
import com.devonfw.application.mtsj.general.common.api.security.UserData;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRepository;
import com.devonfw.application.mtsj.usermanagement.logic.api.Usermanagement;
import com.devonfw.module.security.common.api.accesscontrol.AccessControl;
import com.devonfw.module.security.common.api.accesscontrol.AccessControlProvider;
import com.devonfw.module.security.common.api.accesscontrol.PrincipalAccessControlProvider;
import com.devonfw.module.security.common.base.accesscontrol.AccessControlGrantedAuthority;

/**
 * This class represents a customized implementation of the {@link UserDetailsService} interface.<br/>
 * <br/>
 * It should be used in custom subclasses of {@link WebSecurityConfigurerAdapter} in the following way:
 * <ul>
 * <li>Inject a fully configured instance of {@link BaseUserDetailsService} into the subclass of
 * {@link WebSecurityConfigurerAdapter}</li>
 * <li>Override method {@code configure(HttpSecurity)} of {@link WebSecurityConfigurerAdapter}</li>
 * <li>Add the {@link BaseUserDetailsService} to the {@code HttpSecurity} object.</li>
 * </ul>
 * The following code snippet shows the above steps:<br/>
 *
 * <pre>
 * &#64;Configuration
 * &#64;EnableWebSecurity
 * public class MyWebSecurityConfig extends WebSecurityConfigurerAdapter {
 *   // ...
 *   &#64;Inject
 *   private UserDetailsService userDetailsService;
 *   // ...
 *   &#64;Override
 *   public void configure(HttpSecurity http) throws Exception {
 *      http.userDetailsService(this.userDetailsService)... //add matchers and other stuff
 *   }
 * }
 * </pre>
 *
 * <br/>
 * For another example, have a look at
 * {@link com.devonfw.application.mtsj.general.service.impl.config.BaseWebSecurityConfig}.
 */
@Named
public class BaseUserDetailsService implements UserDetailsService {

  /** Logger instance. */
  private static final Logger LOG = LoggerFactory.getLogger(BaseUserDetailsService.class);

  private Usermanagement usermanagement;

  private AuthenticationManagerBuilder amBuilder;

  private AccessControlProvider accessControlProvider;

  private PrincipalAccessControlProvider<UserProfile> principalAccessControlProvider;

  private UserEntity user;

  @Inject
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

    UserProfile principal = retrievePrincipal(username);
    Set<GrantedAuthority> authorities = getAuthorities(principal);
    try {
      // Retrieve user from H2 in memory database instead from AuthenticationManagerBuilder
      this.user = this.userRepository.findByUsername(username);
      UserData userData = new UserData(this.user.getUsername(), this.user.getPassword(), authorities);
      userData.setUserProfile(principal);
      return userData;
    } catch (Exception e) {
      UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
      LOG.warn("Failed to get user {}.", username, exception);
      throw exception;
    }
  }

  /**
   * Returns the {@link GrantedAuthority}s of the user associated with the provided {@link UserProfile}.
   *
   * @param principal the {@link UserProfile} of the user
   * @return the associated {@link GrantedAuthority}s
   * @throws AuthenticationException if no principal is retrievable for the given {@code username}
   */
  protected Set<GrantedAuthority> getAuthorities(UserProfile principal) throws AuthenticationException {

    if (principal == null) {
      LOG.warn("Principal must not be null.");
      throw new IllegalArgumentException();
    }
    // determine granted authorities for spring-security...
    Set<GrantedAuthority> authorities = new HashSet<>();
    Collection<String> accessControlIds = this.principalAccessControlProvider.getAccessControlIds(principal);
    Set<AccessControl> accessControlSet = new HashSet<>();
    for (String id : accessControlIds) {
      boolean success = this.accessControlProvider.collectAccessControls(id, accessControlSet);
      if (!success) {
        LOG.warn("Undefined access control {}.", id);
      }
    }
    for (AccessControl accessControl : accessControlSet) {
      authorities.add(new AccessControlGrantedAuthority(accessControl));
    }
    return authorities;
  }

  public Set<GrantedAuthority> getAuthoritiesFromList(/* UserProfile principal */List<String> roles)
      throws AuthenticationException {

    // if (principal == null) {
    // LOG.warn("Principal must not be null.");
    // throw new IllegalArgumentException();
    // }
    // determine granted authorities for spring-security...
    Set<GrantedAuthority> authorities = new HashSet<>();
    List<String> listOfRoles = new ArrayList<>();

    for (String role : roles) {
      listOfRoles.add(role);
    }
    Collection<String> accessControlIds = listOfRoles/* getAccessControlIds(principal) */;
    Set<AccessControl> accessControlSet = new HashSet<>();
    for (String id : accessControlIds) {
      boolean success = this.accessControlProvider.collectAccessControls(id, accessControlSet);
      if (!success) {
        LOG.warn("Undefined access control {}.", id);
      }
    }
    for (AccessControl accessControl : accessControlSet) {
      authorities.add(new AccessControlGrantedAuthority(accessControl));
    }
    return authorities;
  }

  /**
   * @param username The {@code username} for which the {@code UserProfile} will be queried.
   * @return An instance of type {@link UserProfile} obtained by querying the {@code username}.
   */
  protected UserProfile retrievePrincipal(String username) {

    try {
      return this.usermanagement.findUserProfileByLogin(username);
    } catch (RuntimeException e) {
      UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
      LOG.warn("Failed to get user {}.", username, exception);
      throw exception;
    }
  }

  /**
   * @return usermanagement
   */
  public Usermanagement getUsermanagement() {

    return this.usermanagement;
  }

  /**
   * @param usermanagement new value of {@link #getUsermanagement}.
   */
  @Inject
  public void setUsermanagement(Usermanagement usermanagement) {

    this.usermanagement = usermanagement;
  }

  /**
   * @return amBuilder
   */
  public AuthenticationManagerBuilder getAmBuilder() {

    return this.amBuilder;
  }

  /**
   * @param amBuilder new value of {@link #getAmBuilder}.
   */
  @Inject
  public void setAmBuilder(AuthenticationManagerBuilder amBuilder) {

    this.amBuilder = amBuilder;
  }

  /**
   * @return accessControlProvider
   */
  public AccessControlProvider getAccessControlProvider() {

    return this.accessControlProvider;
  }

  /**
   * @param accessControlProvider new value of {@link #getAccessControlProvider}.
   */
  @Inject
  public void setAccessControlProvider(AccessControlProvider accessControlProvider) {

    this.accessControlProvider = accessControlProvider;
  }

  /**
   * @return principalAccessControlProvider
   */
  public PrincipalAccessControlProvider<UserProfile> getPrincipalAccessControlProvider() {

    return this.principalAccessControlProvider;
  }

  /**
   * @param principalAccessControlProvider new value of {@link #getPrincipalAccessControlProvider}.
   */
  @Inject
  public void setPrincipalAccessControlProvider(
      PrincipalAccessControlProvider<UserProfile> principalAccessControlProvider) {

    this.principalAccessControlProvider = principalAccessControlProvider;
  }
}
