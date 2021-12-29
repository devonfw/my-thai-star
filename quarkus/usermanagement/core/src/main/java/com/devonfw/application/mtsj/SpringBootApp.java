package com.devonfw.application.mtsj;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

import com.devonfw.module.jpa.dataaccess.api.AdvancedRevisionEntity;
import com.devonfw.module.jpa.dataaccess.impl.data.GenericRepositoryFactoryBean;

@SpringBootApplication
@EntityScan(basePackages = { "com.devonfw.application.mtsj" }, basePackageClasses = { AdvancedRevisionEntity.class })
@EnableJpaRepositories(repositoryFactoryBeanClass = GenericRepositoryFactoryBean.class)
@EnableGlobalMethodSecurity(jsr250Enabled = true)
public class SpringBootApp {

  /**
   * Entry point for spring-boot based app
   *
   * @param args - arguments
   */
  public static void main(String[] args) {

    if (Arrays.stream(args).anyMatch((String e) -> e.contains("--spring.batch.job.names"))) {
      // if executing batch job, explicitly exit jvm to report error code from batch
      System.exit(SpringApplication.exit(SpringApplication.run(SpringBootApp.class, args)));
    } else {
      // normal web application start
      SpringApplication.run(SpringBootApp.class, args);
    }
  }
}
