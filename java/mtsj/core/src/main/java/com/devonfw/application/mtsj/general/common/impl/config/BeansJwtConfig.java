package com.devonfw.application.mtsj.general.common.impl.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.devonfw.module.security.jwt.common.base.JwtAuthenticationFilter;

@Configuration
@ComponentScan(basePackages = { "com.devonfw.module.security" })
public class BeansJwtConfig {

  @Bean
  public JwtAuthenticationFilter getJwtAuthenticationFilter() throws Exception {

    JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter();
    return jwtAuthenticationFilter;
  }
}
