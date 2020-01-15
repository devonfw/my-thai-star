package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import javax.inject.Inject;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import com.devonfw.application.mtsj.dishmanagement.common.api.to.IngredientEto;

/**
 * @author simon
 *
 */
@Configuration
@EnableBatchProcessing
public class IngredientImportBatchConfig {

  @Inject
  public JobBuilderFactory jobBuilderFactory;

  @Inject
  public StepBuilderFactory stepBuilderFactory;

  @Bean
  public FlatFileItemReader<IngredientEto> ingredientImportReader() {

    return new FlatFileItemReaderBuilder<IngredientEto>().name("ingredientReader")
        .resource(new FileSystemResource("test.csv")).delimited().delimiter(";")
        .names(new String[] { "name", "description", "price" }).targetType(IngredientEto.class).build();
  }

  @Bean
  public Step ingredientImportStep1() {

    return this.stepBuilderFactory.get("ingredientImportStep1").<IngredientEto, IngredientEto> chunk(10)
        .reader(ingredientImportReader()).writer(ingredientImportWriter()).build();
  }

  /*
   * Define the actual dishExportJob. Then name of the job according to the JobBuilderFactory should match the name of
   * this method. This in fact results in a job-bean named "dishExportJob" which matches to the job-name in the
   * registry. This makes things easier, since different job starters in spring-batch use the bean-name and some use the
   * job name from the JobRegistry.
   *
   */
  @Bean
  public Job ingredientImportJob() {

    return this.jobBuilderFactory.get("ingredientImportJob").incrementer(new RunIdIncrementer())
        .start(ingredientImportStep1()).build();
  }

  @Bean
  public IngredientEtoItemWriter ingredientImportWriter() {

    return new IngredientEtoItemWriter();
  }

}
