package io.oasp.application.mtsj.general.security;

import java.io.IOException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SigningKeyResolverAdapter;
import io.oasp.application.mtsj.general.common.api.datatype.Role;
import io.oasp.application.mtsj.general.common.api.to.UserDetailsClientTo;
import io.oasp.application.mtsj.general.security.oauth.azure.AzureDataService;

/**
 * Service class for JWT token managing
 *
 */
public class TokenAuthenticationService {

  /*
   * NOTE: Currently, this service uses AzureDataService to retrieve the key to verify the signature of the tokens.
   *
   */

  /** Logger instance. */
  private static final Logger LOG = LoggerFactory.getLogger(TokenAuthenticationService.class);

  /**
   * This method returns the token once the Authentication has been successful
   *
   * @param res the {@HttpServletResponse}
   * @param auth the {@Authentication} object with the user credentials
   */
  static void addAuthentication(HttpServletResponse res, Authentication auth) {

  }

  /**
   * This method validates the token and returns a {@link UsernamePasswordAuthenticationToken}
   *
   * @param request the {@link HttpServletRequest}
   * @return the {@link UsernamePasswordAuthenticationToken}
   */
  static Authentication getAuthentication(HttpServletRequest request) {

    String token = request.getHeader("Authorization");
    if (token != null) {

      Jws<Claims> decodedToken = decode(token);
      String user = getClaim(decodedToken, "name");
      return user != null ? new UsernamePasswordAuthenticationToken(user, null, getAuthorities(decodedToken)) : null;

    }

    return null;
  }

  /**
   * Extracts and returns the {@link UserDetailsClientTo} from the JWT token
   *
   * @param token the JWT token
   * @return the {@link UserDetailsClientTo} object
   */
  public static UserDetailsClientTo getUserdetailsFromToken(String token) {

    UserDetailsClientTo userDetails = new UserDetailsClientTo();
    try {

      Jws<Claims> decodedToken = decode(token);
      validateToken(decodedToken);
      // Get user from token
      String user = getClaim(decodedToken, "name");
      if (user != null) {
        userDetails.setName(user);
      }
      // Retrieve user groups for this user from somewhere
      ArrayList<String> roles = getRoles(decodedToken);
      // Map user groups (external) to user roles (local)
      if (roles.contains("Waiter")) {
        userDetails.setRole(Role.WAITER);
      } else if (roles.contains("Customer")) {
        userDetails.setRole(Role.CUSTOMER);
      }
      // -> remove authentication code (currently still exists, but unused)
      // -> move/adapt user mapping code (currently copied from LDAP; has to be changed/moved for Graph API)

    } catch (Exception e) {
      LOG.error(e.getMessage());
      userDetails = null;
    }

    return userDetails;
  }

  private static Jws<Claims> decode(String token) {

    // Implicitly verifies token signature
    return Jwts.parser().setSigningKeyResolver(new SigningKeyResolverAdapter() {
      @Override
      public Key resolveSigningKey(JwsHeader header, Claims claims) {

        // inspect the header, lookup and return the signing key
        String kid = header.getKeyId();
        try {
          return AzureDataService.retrieveKey(kid);
        } catch (InvalidKeySpecException | NoSuchAlgorithmException | IOException e) {
          e.printStackTrace();
          throw new RuntimeException(e);
        }
      }
    }).parseClaimsJws(token);

  }

  private static boolean validateToken(Jws<Claims> decodedToken) {

    boolean valid = decodedToken != null; // token signature was verified in decode(..)

    // TODO: more verification

    if (!valid)
      throw new RuntimeException("Validation failed!");
    return valid;
  }

  static Collection<? extends GrantedAuthority> getAuthorities(Jws<Claims> decodedToken) {

    List<String> roles = getRoles(decodedToken);
    List<GrantedAuthority> authorities = new ArrayList<>();
    for (String role : roles) {
      authorities.add(new SimpleGrantedAuthority("ROLE_" + role));
    }
    return authorities;

  }

  private static String getClaim(Jws<Claims> decodedToken, String att) {

    return decodedToken.getBody().get(att, String.class);
  }

  private static ArrayList<String> getRoles(Jws<Claims> decodedToken) {

    ArrayList<String> roles = new ArrayList();
    if (decodedToken.getBody().get("roles", ArrayList.class) != null) {
      roles = decodedToken.getBody().get("roles", ArrayList.class);
    } else {
      roles.add("Customer");
    }
    return roles;
  }

}
