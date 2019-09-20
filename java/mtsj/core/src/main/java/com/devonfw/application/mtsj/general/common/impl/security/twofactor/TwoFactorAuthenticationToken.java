package com.devonfw.application.mtsj.general.common.impl.security.twofactor;

import java.util.Collection;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

public class TwoFactorAuthenticationToken extends AbstractAuthenticationToken {

  private Object username;

  private Object password;

  private Object token;

  public TwoFactorAuthenticationToken(Object principal, Object credentials, Object token,
      Collection<? extends GrantedAuthority> authorities) {

    super(authorities);
    this.username = principal;
    this.password = credentials;
    this.token = token;
    setDetails(token);
    setAuthenticated(false);
  }

  @Override
  public void setAuthenticated(boolean isAuthenticated) throws IllegalArgumentException {

    if (isAuthenticated) {
      throw new IllegalArgumentException(
          "Cannot set this token to trusted - use constructor which takes a GrantedAuthority list instead");
    }
    super.setAuthenticated(false);
  }

  @Override
  public void setDetails(Object token) {

    super.setDetails(token);
  }

  @Override
  public Object getPrincipal() {

    return this.username;
  }

  @Override
  public Object getCredentials() {

    return this.password;
  }

  public Object getToken() {

    return this.token;
  }

  @Override
  public void eraseCredentials() {

    super.eraseCredentials();
  }
}
