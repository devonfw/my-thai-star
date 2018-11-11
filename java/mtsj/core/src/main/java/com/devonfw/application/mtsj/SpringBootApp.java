package com.devonfw.application.mtsj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.actuate.autoconfigure.endpoint.EndpointAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

import com.devonfw.module.jpa.dataaccess.api.AdvancedRevisionEntity;
import com.devonfw.module.jpa.dataaccess.impl.data.GenericRepositoryFactoryBean;

//@SpringBootApplication(exclude = { SecurityAutoConfiguration.class, SecurityFilterAutoConfiguration.class })
@SpringBootApplication(exclude = { EndpointAutoConfiguration.class })
@EntityScan(basePackages = { "com.devonfw.application.mtsj" }, basePackageClasses = { AdvancedRevisionEntity.class })
@EnableGlobalMethodSecurity(jsr250Enabled = true)
@EnableJpaRepositories(repositoryFactoryBeanClass = GenericRepositoryFactoryBean.class)
// @ComponentScan(basePackages = { "com.devonfw.application.mtsj.general", "com.devonfw.application.mtsj" })
public class SpringBootApp {

  /**
   * Entry point for spring-boot based app
   *
   * @param args - arguments
   */
  public static void main(String[] args) {

    SpringApplication.run(SpringBootApp.class, args);
  }
}
