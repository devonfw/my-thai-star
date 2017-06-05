package io.oasp.application.mtsj.general.security;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.oasp.application.mtsj.general.common.api.UserProfile;
import io.oasp.application.mtsj.usermanagement.logic.impl.UsermanagementImpl;
import io.oasp.module.security.common.api.accesscontrol.AccessControl;
import io.oasp.module.security.common.api.accesscontrol.AccessControlGroup;
import io.oasp.module.security.common.api.accesscontrol.AccessControlPermission;
import io.oasp.module.security.common.base.accesscontrol.AccessControlGrantedAuthority;

public class TokenAuthenticationService {

  /** Logger instance. */
  private static final Logger LOG = LoggerFactory.getLogger(TokenAuthenticationService.class);

  static final String ISSUER = "MyThaiStarApp";

  static final long EXPIRATIONTIME = 864_000_000; // 10 days

  static final String SECRET = "ThisIsASecret";

  static final String TOKEN_PREFIX = "Bearer";

  static final String HEADER_STRING = "Authorization";

  static final String CLAIM_SUBJECT = "sub";

  static final String CLAIM_ISSUER = "iss";

  static final String CLAIM_EXPIRATION = "exp";

  static final String CLAIM_CREATED = "iat";

  static final String CLAIM_SCOPE = "scope";

  static void addAuthentication(HttpServletResponse res, Authentication auth) {

    String token = generateToken(auth);
    res.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + token);
  }

  static Authentication getAuthentication(HttpServletRequest request) {

    String token = request.getHeader(HEADER_STRING);
    if (token != null) {
      // parse the token.
      String user =
          Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody().getSubject();

      return user != null
          ? new UsernamePasswordAuthenticationToken(user, null, /* Collections.emptyList() */ getAuthorities(token))
          : null;
    }
    return null;
  }

  @SuppressWarnings("unchecked")
  static protected Collection<? extends GrantedAuthority> getAuthorities(String token) {

    @SuppressWarnings("unused")
    // String audience =
    // Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody().getAudience();
    //
    // List<String> roles = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX,
    // "")).getBody()
    // .get(CLAIM_SCOPE, List.class);

    // Collection<? extends GrantedAuthority> authorities = Arrays.asList();

    // Collection<? extends GrantedAuthority> authorities = Jwts.parser().setSigningKey(SECRET)
    // .parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody().get(CLAIM_SCOPE, List.class);
    // return (Collection<? extends GrantedAuthority>) Collections.emptyList();

    // Collection<GrantedAuthority> authorities = Jwts.parser().setSigningKey(SECRET)
    // .parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody().get(CLAIM_SCOPE, Collection.class);

    String userName =
        Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody().getSubject();

    List<LinkedHashMap> scopes = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
        .getBody().get(CLAIM_SCOPE, List.class);
    // List<GrantedAuthority> authorities = new ArrayList<>();
    List<String> roles = new ArrayList<>();
    for (LinkedHashMap<?, ?> scope : scopes) {
      System.out.println(scope.toString());

      roles.add(/* new SimpleGrantedAuthority( */scope.get("authority").toString().replaceAll("ROLE_", "")/* ) */);
    }

    // Collection<String> roles = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
    // .getBody().get(CLAIM_SCOPE, List.class);

    // UserDetails userDetails = loadUserByUsername(userName);
    // return userDetails.getAuthorities();

    // Set<GrantedAuthority> SetOfAuthorities = new HashSet<>();
    // Collection<String> accessControlIds = getAccessControlIds(principal);
    // Set<AccessControl> accessControlSet = new HashSet<>();
    // BaseUserDetailsService buds = new BaseUserDetailsService();
    return getAuthorities(roles);
    // return authorities;
  }

  static String generateToken(Authentication auth) {

    List<String> scopes = new ArrayList<>();
    Collection<? extends GrantedAuthority> authorities = auth.getAuthorities();
    for (GrantedAuthority authority : authorities) {
      scopes.add(authority.getAuthority());
    }

    Map<String, Object> claims = new HashMap<>();
    claims.put(CLAIM_ISSUER, ISSUER);
    claims.put(CLAIM_SUBJECT, auth.getName());
    claims.put(CLAIM_SCOPE, /* scopes */auth.getAuthorities());
    claims.put(CLAIM_CREATED, new Date());
    claims.put(CLAIM_EXPIRATION, generateExpirationDate());
    claims.put(CLAIM_CREATED, new Date());

    return Jwts.builder().setClaims(claims).signWith(SignatureAlgorithm.HS512, SECRET).compact();
  }

  static Date generateExpirationDate() {

    return new Date(System.currentTimeMillis() + EXPIRATIONTIME);
  }

  // *************************************************************************************************

  // static UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
  //
  // BaseUserDetailsService baseUserDetailsService = new BaseUserDetailsService();
  // UserProfile principal = retrievePrincipal(username);
  // Set<GrantedAuthority> authorities = getAuthorities(principal);
  // UserDetails user;
  // try {
  // // amBuilder uses the InMemoryUserDetailsManager, because it is configured in BaseWebSecurityConfig
  // user = baseUserDetailsService.getAmBuilder().getDefaultUserDetailsService().loadUserByUsername(username);
  // UserData userData = new UserData(user.getUsername(), user.getPassword(), authorities);
  // userData.setUserProfile(principal);
  // return userData;
  // } catch (Exception e) {
  // e.printStackTrace();
  // UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
  // LOG.warn("Failed to get user {}.", username, exception);
  // throw exception;
  // }
  // }

  // static UserProfile retrievePrincipal(String username) {
  //
  // UsermanagementImpl usermanagement = new UsermanagementImpl();
  // try {
  // return findUserProfileByLogin(username);
  //
  // } catch (RuntimeException e) {
  // e.printStackTrace();
  // UsernameNotFoundException exception = new UsernameNotFoundException("Authentication failed.", e);
  // LOG.warn("Failed to get user {}.", username, exception);
  // throw exception;
  // }
  // }

  static Set<GrantedAuthority> getAuthorities(/* UserProfile principal */List<String> roles)
      throws AuthenticationException {

    // if (principal == null) {
    // LOG.warn("Principal must not be null.");
    // throw new IllegalArgumentException();
    // }
    // determine granted authorities for spring-security...
    Set<GrantedAuthority> authorities = new HashSet<>();
    // List<String> listOfRoles = new ArrayList<>();
    //
    // for (String role : roles) {
    // listOfRoles.add(role);
    // }
    Collection<String> accessControlIds = roles/* getAccessControlIds(principal) */;
    Set<AccessControl> accessControlSet = new HashSet<>();
    for (String id : accessControlIds) {

      boolean success = collectAccessControls(id, accessControlSet);
      if (!success) {
        LOG.warn("Undefined access control {}.", id);
      }
    }
    for (AccessControl accessControl : accessControlSet) {
      authorities.add(new AccessControlGrantedAuthority(accessControl));
    }
    return authorities;
  }

  static Collection<String> getAccessControlIds(UserProfile principal) {

    UsermanagementImpl usermanagement = new UsermanagementImpl();
    return Arrays.asList(usermanagement.findUserRole(principal.getId()).getName());
    // return Arrays.asList(principal.getRole().getName());
  }

  static boolean collectAccessControls(String groupId, Set<AccessControl> permissions) {

    AccessControl node = getAccessControl(groupId);
    if (node == null) {
      return false;
    }
    if (node instanceof AccessControlGroup) {
      collectPermissionNodes((AccessControlGroup) node, permissions);
    } else {
      // node is a flat AccessControlPermission
      permissions.add(node);
    }
    return true;
  }

  static AccessControl getAccessControl(String nodeId) {

    Map<String, AccessControl> id2nodeMap = new HashMap<>();
    return id2nodeMap.get(nodeId);
  }

  static void collectPermissionNodes(AccessControlGroup group, Set<AccessControl> permissions) {

    boolean added = permissions.add(group);
    if (!added) {
      // we have already visited this node, stop recursion...
      return;
    }
    for (AccessControlPermission permission : group.getPermissions()) {
      permissions.add(permission);
    }
    for (AccessControlGroup inheritedGroup : group.getInherits()) {
      collectPermissionNodes(inheritedGroup, permissions);
    }
  }

  // static UserProfile findUserProfileByLogin(String username) {
  //
  // UserDaoImpl dao = new UserDaoImpl();
  // UserSearchCriteriaTo criteria = new UserSearchCriteriaTo();
  // criteria.setUsername(username);
  // PaginatedListTo<UserEntity> users = dao.findUsers(criteria);
  //
  // if (users.getResult().isEmpty() || users.getResult().size() > 1) {
  // return null;
  // } else {
  // MtsUser mtsUser = new MtsUser();
  // mtsUser.setEmail(users.getResult().get(0).getEmail());
  // mtsUser.setUsername(users.getResult().get(0).getUsername());
  // mtsUser.setUserRoleId(users.getResult().get(0).getUserRoleId());
  // return mtsUser;
  // }
  // }
}
