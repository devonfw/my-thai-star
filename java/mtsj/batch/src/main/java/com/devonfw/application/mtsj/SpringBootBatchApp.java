package com.devonfw.application.mtsj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.devonfw.module.jpa.dataaccess.api.AdvancedRevisionEntity;

@SpringBootApplication
@EntityScan(basePackages = { "com.devonfw.application.mtsj" }, basePackageClasses = { AdvancedRevisionEntity.class })
public class SpringBootBatchApp {

  /**
   * Entry point for spring-boot based app
   *
   * @param args - arguments
   */
  public static void main(String[] args) {

    SpringApplication.run(SpringBootApp.class, args);
  }
}
