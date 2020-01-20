package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import javax.inject.Inject;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.builder.FlatFileItemWriterBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import com.devonfw.application.mtsj.dishmanagement.dataaccess.api.IngredientEntity;

/**
 * Example for devon4j-batch module. This class configures a spring-batch witch exports all ingredients from mts to a
 * file. It requires one additional command line parameter "pathToFile" for the output file:<br/>
 * {@code java -jar mtsj-batch-3.2.0-SNAPSHOT-bootified.jar --spring.main.web-application-type=none --spring.batch.job.enabled=true --spring.batch.job.names=ingredientExportJob pathToFile=example.csv}
 *
 */
@Configuration
@EnableBatchProcessing
public class IngredientExportBatchConfig {

  // Pattern for simplifying DI with bean methods containing expressions.
  private static final String OVERRIDDEN_BY_EXPRESSION = null;

  @Inject
  private JobBuilderFactory jobBuilderFactory;

  @Inject
  private StepBuilderFactory stepBuilderFactory;

  @Bean
  public IngredientEntityItemReader ingredientExportReader() {

    return new IngredientEntityItemReader();
  }

  @Bean
  public Step ingredientExportStep1() {

    return this.stepBuilderFactory.get("ingredientExportStep1").<IngredientEntity, IngredientEntity> chunk(10)
        .reader(ingredientExportReader()).writer(ingredientExportWriter(OVERRIDDEN_BY_EXPRESSION)).build();
  }

  /*
   * Define the actual dishExportJob. Then name of the job according to the JobBuilderFactory should match the name of
   * this method. This in fact results in a job-bean named "dishExportJob" which matches to the job-name in the
   * registry. This makes things easier, since different job starters in spring-batch use the bean-name and some use the
   * job name from the JobRegistry.
   *
   */
  @Bean
  public Job ingredientExportJob() {

    return this.jobBuilderFactory.get("ingredientExportJob").start(ingredientExportStep1()).build();
  }

  @Bean
  @StepScope // Step scope is required for the @Value-annotation for querying job parameters.
  public FlatFileItemWriter<IngredientEntity> ingredientExportWriter(
      @Value("#{jobParameters[pathToFile]}") String pathToFile) {

    return new FlatFileItemWriterBuilder<IngredientEntity>().name("dishWriter")
        .resource(new FileSystemResource(pathToFile)).delimited().delimiter(";")
        .names(new String[] { "name", "description", "price" }).build();
  }

}
