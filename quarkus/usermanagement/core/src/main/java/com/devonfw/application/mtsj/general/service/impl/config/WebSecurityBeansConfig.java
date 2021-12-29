package com.devonfw.application.mtsj.general.service.impl.config;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.security.web.csrf.CsrfTokenRepository;
import org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository;

import com.devonfw.application.mtsj.general.common.base.DefaultRolesPrefixPostProcessor;
import com.devonfw.application.mtsj.general.common.impl.security.ApplicationAccessControlConfig;
import com.devonfw.module.security.common.api.accesscontrol.AccessControlProvider;
import com.devonfw.module.security.common.base.accesscontrol.AccessControlSchemaProvider;
import com.devonfw.module.security.common.impl.accesscontrol.AccessControlSchemaProviderImpl;

/**
 * This configuration class provides factory methods for several Spring security related beans.
 *
 */
@Configuration
public class WebSecurityBeansConfig {

  /**
   * This method provides a new instance of {@code AccessControlProvider}
   *
   * @return the newly created {@code AccessControlProvider}
   */
  @Bean
  public AccessControlProvider accessControlProvider() {

    return new ApplicationAccessControlConfig();
  }

  /**
   * This method provides a new instance of {@code AccessControlSchemaProvider}
   *
   * @return the newly created {@code AccessControlSchemaProvider}
   */
  @Bean
  public AccessControlSchemaProvider accessControlSchemaProvider() {

    return new AccessControlSchemaProviderImpl();
  }

  /**
   * This method provides a new instance of {@code CsrfTokenRepository}
   *
   * @return the newly created {@code CsrfTokenRepository}
   */
  @Bean
  public CsrfTokenRepository csrfTokenRepository() {

    return new HttpSessionCsrfTokenRepository();
  }

  /**
   * This method provides a new instance of {@code DefaultRolesPrefixPostProcessor}
   *
   * @return the newly create {@code DefaultRolesPrefixPostProcessor}
   */
  @Bean
  public static DefaultRolesPrefixPostProcessor defaultRolesPrefixPostProcessor() {

    // By default Spring-Security is setting the prefix "ROLE_" for all permissions/authorities.
    // We disable this undesired behavior here...
    return new DefaultRolesPrefixPostProcessor("");
  }

  /**
   * This method provide a new instance of {@code DelegatingPasswordEncoder}
   *
   * @return the newly create {@code DelegatingPasswordEncoder}
   */
  @Bean
  public PasswordEncoder passwordEncoder() {

    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  public PasswordEncoder delegatingPasswordEncoder() {

    PasswordEncoder defaultEncoder = new StandardPasswordEncoder();
    Map<String, PasswordEncoder> encoders = new HashMap<>();
    encoders.put("bcrypt", new BCryptPasswordEncoder());

    DelegatingPasswordEncoder passworEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
    passworEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

    return passworEncoder;
  }

}
