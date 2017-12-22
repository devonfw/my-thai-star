package io.oasp.application.mtsj.general.security.ldap.azure;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.inject.Inject;
import javax.inject.Named;
import javax.naming.directory.Attributes;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ldap.core.DirContextAdapter;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.ldap.userdetails.UserDetailsContextMapper;
import org.springframework.stereotype.Component;

import com.capgemini.devonfw.module.winauthad.common.api.AuthenticationSource;
import com.capgemini.devonfw.module.winauthad.common.api.UserData;
import com.capgemini.devonfw.module.winauthad.common.impl.security.GroupMapperAD;
import com.capgemini.devonfw.module.winauthad.common.impl.security.PrincipalProfileImpl;

/**
 *
 */
@Named
@Component
public class UserDetailsContextMapperAzureADImpl implements UserDetailsContextMapper {

  private static final Logger LOG = LoggerFactory.getLogger(UserDetailsContextMapperAzureADImpl.class);

  @Inject
  private AuthenticationSource authenticationSource;

  @Inject
  private GroupMapperAD groupMapperAD;

  // @Inject
  // private AccessControlProvider accessControlProvider;

  /**
   * @return authenticationSource
   */
  public AuthenticationSource getAuthenticationSource() {

    return this.authenticationSource;
  }

  /**
   * @param authenticationSource new value of authenticationSource.
   */
  public void setAuthenticationSource(AuthenticationSource authenticationSource) {

    this.authenticationSource = authenticationSource;
  }

  // /**
  // * @param accessControlProvider new value of accessControlProvider.
  // */
  // public void setAccessControlProvider(AccessControlProvider accessControlProvider) {
  //
  // this.accessControlProvider = accessControlProvider;
  // }

  /**
   * @return groupMapperAD
   */
  public GroupMapperAD getGroupMapperAD() {

    return this.groupMapperAD;
  }

  /**
   * @param groupMapperAD new value of groupMapperAD.
   */
  public void setGroupMapperAD(GroupMapperAD groupMapperAD) {

    this.groupMapperAD = groupMapperAD;
  }

  @SuppressWarnings("javadoc")
  @Override
  public UserDetails mapUserFromContext(DirContextOperations ctx, String username,
      Collection<? extends GrantedAuthority> authorities) {

    UserData user = new UserData(username, "", authorities);

    try {
      Attributes attributes = this.authenticationSource.searchUserByUsername(username);

      String cn = attributes.get("cn").toString().substring(4);// Username
      String givenname = attributes.get("givenname").toString().substring(11); // FirstName
      String sn = attributes.get("sn").toString().substring(4);// LastName
      String memberOf = attributes.get("memberof").toString().substring(10); // Groups

      PrincipalProfileImpl userProfile = new PrincipalProfileImpl();
      userProfile.setName(cn);
      userProfile.setFirstName(givenname);
      userProfile.setLastName(sn);
      userProfile.setId(cn);
      ArrayList<String> groups = this.groupMapperAD.groupsMapping(memberOf);

      userProfile.setGroups(groups);

      Set<GrantedAuthority> authoritiesAD = new HashSet<>();
      for (String role : groups) {
        authoritiesAD.add(new SimpleGrantedAuthority(role));
      }

      /*
       * // determine granted authorities for spring-security... Set<GrantedAuthority> authoritiesAD = new HashSet<>();
       * Collection<String> accessControlIds = groups; Set<AccessControl> accessControlSet = new HashSet<>(); for
       * (String id : accessControlIds) { boolean success = this.accessControlProvider.collectAccessControls(id,
       * accessControlSet); if (!success) { LOG.warn("Undefined access control {}.", id); // authorities.add(new
       * SimpleGrantedAuthority(id)); } } for (AccessControl accessControl : accessControlSet) { authoritiesAD.add(new
       * AccessControlGrantedAuthority(accessControl)); }
       */

      user = new UserData(username, "", authoritiesAD);
      user.setUserProfile(userProfile);
    } catch (Exception e) {
      e.printStackTrace();
      UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
      LOG.warn("Failed com.capgemini.devonfw.module.winauthad.common.impl.security get user {} in Active Directory."
          + username + exception);
      throw exception;
    }
    return user;
  }

  @SuppressWarnings("javadoc")
  @Override
  public void mapUserToContext(UserDetails user, DirContextAdapter ctx) {

  }
}