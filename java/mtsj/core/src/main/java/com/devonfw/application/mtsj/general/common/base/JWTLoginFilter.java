package com.devonfw.application.mtsj.general.common.base;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.devonfw.application.mtsj.general.common.api.datatype.SecondFactor;
import com.devonfw.application.mtsj.general.common.api.security.BasicAccountCredentials;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Login Filter for Json Web Token
 */
public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter {

    /**
     * Logger instance.
     */
    private static final Logger LOG = LoggerFactory.getLogger(JWTLoginFilter.class);

    private UserDetailsService userDetailsService;
    /**
     * The constructor.
     *
     * @param url         the login url
     * @param authManager the {@link AuthenticationManager}
     */
    public JWTLoginFilter(String url, AuthenticationManager authManager, UserDetailsService userDetailsService) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {

        BasicAccountCredentials creds = new ObjectMapper().readValue(req.getInputStream(), BasicAccountCredentials.class);
        UserDetails user = this.userDetailsService.loadUserByUsername(creds.getUsername());
	    ValidationService.validateCredentials(creds);
        return getAuthenticationManager()
                .authenticate(new UsernamePasswordAuthenticationToken(creds.getUsername(), creds.getPassword(), user.getAuthorities()));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain,
                                            Authentication auth) throws IOException, ServletException {

        if (auth.getDetails() != SecondFactor.NONE) {
            TokenAuthenticationService.addAllowedHeader(res);
            TokenAuthenticationService.addRequiredAuthentication(res, auth);
        } else {
            TokenAuthenticationService.addAllowedHeader(res);
            TokenAuthenticationService.addAuthentication(res, auth);
            TokenAuthenticationService.addRequiredAuthentication(res, auth);
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse res,
                                              AuthenticationException failed) {

        LOG.info("Authentication was unsuccessful");
        res.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }
}
