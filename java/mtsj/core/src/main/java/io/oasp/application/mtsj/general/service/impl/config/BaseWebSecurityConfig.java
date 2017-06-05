package io.oasp.application.mtsj.general.service.impl.config;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import io.oasp.application.mtsj.general.security.JWTAuthenticationFilter;
import io.oasp.application.mtsj.general.security.JWTLoginFilter;
import io.oasp.module.security.common.impl.rest.JsonUsernamePasswordAuthenticationFilter;
//import io.oasp.module.security.common.impl.rest.JsonUsernamePasswordAuthenticationFilter;

/**
 * This type serves as a base class for extensions of the {@code WebSecurityConfigurerAdapter} and provides a default
 * configuration. <br/>
 * Security configuration is based on {@link WebSecurityConfigurerAdapter}. This configuration is by purpose designed
 * most simple for two channels of authentication: simple login form and rest-url.
 */
public abstract class BaseWebSecurityConfig extends WebSecurityConfigurerAdapter {

  @Value("${security.cors.enabled}")
  boolean corsEnabled = true;

  @Inject
  private UserDetailsService userDetailsService;

  // private CorsFilter getCorsFilter() {
  //
  // UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  // CorsConfiguration config = new CorsConfiguration();
  // config.setAllowCredentials(true);
  // config.addAllowedOrigin("*");
  // config.addAllowedHeader("*");
  // config.addAllowedMethod("OPTIONS");
  // config.addAllowedMethod("HEAD");
  // config.addAllowedMethod("GET");
  // config.addAllowedMethod("PUT");
  // config.addAllowedMethod("POST");
  // config.addAllowedMethod("DELETE");
  // config.addAllowedMethod("PATCH");
  // source.registerCorsConfiguration("/**", config);
  // return new CorsFilter(source);
  // }

  /**
   * Configure spring security to enable a simple webform-login + a simple rest login.
   */
  @Override
  public void configure(HttpSecurity http) throws Exception {

    String[] unsecuredResources = new String[] { "/login", "/security/**", "/services/rest/login",
    "/services/rest/logout", "/services/rest/dishmanagement/**", "/services/rest/imagemanagement/**",
    "/services/rest/ordermanagement/v1/order" };
    // http
    // //
    // .userDetailsService(this.userDetailsService)
    // // define all urls that are not to be secured
    // .authorizeRequests().antMatchers(unsecuredResources).permitAll().anyRequest().authenticated().and()
    //
    // // activate crsf check for a selection of urls (but not for login & logout)
    // // .csrf().requireCsrfProtectionMatcher(new CsrfRequestMatcher()).and()
    // .csrf().disable()
    // // configure parameters for simple form login (and logout)
    // .formLogin().successHandler(new SimpleUrlAuthenticationSuccessHandler()).defaultSuccessUrl("/")
    // .failureUrl("/login.html?error").loginProcessingUrl("/j_spring_security_login").usernameParameter("username")
    // .passwordParameter("password").and()
    // // logout via POST is possible
    // .logout().logoutSuccessUrl("/login.html").and()
    //
    // // register login and logout filter that handles rest logins
    // .addFilterAfter(getSimpleRestAuthenticationFilter(), BasicAuthenticationFilter.class)
    // .addFilterAfter(getSimpleRestLogoutFilter(), LogoutFilter.class);

    http.userDetailsService(this.userDetailsService).csrf().disable().exceptionHandling().and().sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
        .antMatchers(unsecuredResources).permitAll().antMatchers(HttpMethod.POST, "/login").permitAll().anyRequest()
        .authenticated().and()
        // We filter the api/login requests
        .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
            UsernamePasswordAuthenticationFilter.class)
        // And filter other requests to check the presence of JWT in header
        .addFilterBefore(new JWTAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    // if (this.corsEnabled) {
    // http.addFilterBefore(getCorsFilter(), CsrfFilter.class);
    // }
  }

  /**
   * Create a simple filter that allows logout on a REST Url /services/rest/logout and returns a simple HTTP status 200
   * ok.
   *
   * @return the filter.
   */
  // protected Filter getSimpleRestLogoutFilter() {
  //
  // LogoutFilter logoutFilter =
  // new LogoutFilter(new LogoutSuccessHandlerReturningOkHttpStatusCode(), new SecurityContextLogoutHandler());
  //
  // // configure logout for rest logouts
  // logoutFilter.setLogoutRequestMatcher(new AntPathRequestMatcher("/services/rest/logout"));
  //
  // return logoutFilter;
  // }

  /**
   * Create a simple authentication filter for REST logins that reads user-credentials from a json-parameter and returns
   * status 200 instead of redirect after login.
   *
   * @return the {@link JsonUsernamePasswordAuthenticationFilter}.
   * @throws Exception if something goes wrong.
   */
  // protected JsonUsernamePasswordAuthenticationFilter getSimpleRestAuthenticationFilter() throws Exception {
  //
  // JsonUsernamePasswordAuthenticationFilter jsonFilter =
  // new JsonUsernamePasswordAuthenticationFilter(new AntPathRequestMatcher("/services/rest/login"));
  // jsonFilter.setPasswordParameter("j_password");
  // jsonFilter.setUsernameParameter("j_username");
  // jsonFilter.setAuthenticationManager(authenticationManager());
  // // set failurehandler that uses no redirect in case of login failure; just HTTP-status: 401
  // jsonFilter.setAuthenticationManager(authenticationManagerBean());
  // jsonFilter.setAuthenticationFailureHandler(new SimpleUrlAuthenticationFailureHandler());
  // // set successhandler that uses no redirect in case of login success; just HTTP-status: 200
  // jsonFilter.setAuthenticationSuccessHandler(new AuthenticationSuccessHandlerSendingOkHttpStatusCode());
  // return jsonFilter;
  // }

  @Override
  @SuppressWarnings("javadoc")
  // @Inject
  public void configure/* Global */(AuthenticationManagerBuilder auth) throws Exception {

    auth.inMemoryAuthentication().withUser("waiter").password("waiter").roles("Waiter");
  }

}
