package com.devonfw.application.mtsj.general.common.base;

import com.devonfw.application.mtsj.general.common.base.AccountCredentials;
import com.devonfw.application.mtsj.general.common.base.TokenAuthenticationService;
import com.devonfw.application.mtsj.general.common.impl.security.twofactor.TwoFactorAuthenticationProvider;
import com.devonfw.application.mtsj.general.common.impl.security.twofactor.TwoFactorAuthenticationToken;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationDetailsSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TwoFactorFilter extends AbstractAuthenticationProcessingFilter {

    /**
     * Logger instance.
     */
    private static final Logger LOG = LoggerFactory.getLogger(TwoFactorFilter.class);

    /**
     * The constructor.
     *
     * @param url the login url
     * @param authManager the {@link AuthenticationManager}
     */
    public TwoFactorFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException {

        AccountCredentials creds = new ObjectMapper().readValue(req.getInputStream(), AccountCredentials.class);
        return getAuthenticationManager()
                .authenticate(new TwoFactorAuthenticationToken(creds.getUsername(), creds.getPassword(), creds.getToken()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication auth) {

        TokenAuthenticationService.addAuthentication(res, auth);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed)  {

        LOG.info("Authentication was unsuccessful");
    }
}
