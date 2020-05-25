package com.devonfw.application.mtsj.general.common.base;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.devonfw.application.mtsj.general.common.api.security.TwoFactorAccountCredentials;
import com.devonfw.application.mtsj.general.common.impl.security.twofactor.TwoFactorAuthenticationToken;
import com.fasterxml.jackson.databind.ObjectMapper;

public class TwoFactorFilter extends AbstractAuthenticationProcessingFilter {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(TwoFactorFilter.class);

  private UserDetailsService userDetailsService;

  /**
   * The constructor.
   *
   * @param url the login url
   * @param authManager the {@link AuthenticationManager}
   */
  public TwoFactorFilter(String url, AuthenticationManager authManager, UserDetailsService userDetailsService) {

    super(new AntPathRequestMatcher(url));
    setAuthenticationManager(authManager);
    this.userDetailsService = userDetailsService;
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
      throws AuthenticationException, IOException {

    TwoFactorAccountCredentials creds = new ObjectMapper().readValue(req.getInputStream(),
        TwoFactorAccountCredentials.class);
    UserDetails user = this.userDetailsService.loadUserByUsername(creds.getUsername());
    ValidationService.validateCredentials(creds);
    return getAuthenticationManager().authenticate(new TwoFactorAuthenticationToken(creds.getUsername(),
        creds.getPassword(), creds.getToken(), user.getAuthorities()));
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
      Authentication auth) {

    if ((boolean) auth.getDetails()) {
      TokenAuthenticationService.addAllowedHeader(res);
      TokenAuthenticationService.addAuthentication(res, auth);
    }
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse res,
      AuthenticationException failed) {

    LOG.info("Either the account is not eligible for 2FA or bad credentials");
    res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
  }
}
