package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import javax.inject.Inject;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import com.devonfw.application.mtsj.dishmanagement.common.api.to.IngredientEto;
import com.devonfw.module.batch.common.base.SpringBootBatchCommandLine;

/**
 * Example for devon4j-batch module. This class configures a spring-batch wich imports ingredients for mts from a file.
 * You may create the import file via {@link IngredientExportBatchConfig}. The batch is executed via
 * {@link SpringBootBatchCommandLine}-Launcher from devon4j-batch. It requires one additional command line parameter for
 * the output file:<br/>
 * The job requires one additional command line parameter for the output file:<br/>
 * {@code ava -jar mtsj-batch-3.2.0-SNAPSHOT-bootified-batch.jar com.devonfw.application.mtsj.SpringBootApp com.devonfw.application.mtsj.dishmanagement.batch.impl.IngredientExportBatchConfig ingredientExportJob pathToFile=example.csv}
 *
 */
@Configuration
@EnableBatchProcessing
public class IngredientImportBatchConfig {

  // Pattern for simplifying DI with bean methods containing expressions.
  private static final String OVERRIDDEN_BY_EXPRESSION = null;

  @Inject
  private JobBuilderFactory jobBuilderFactory;

  @Inject
  private StepBuilderFactory stepBuilderFactory;

  @Bean
  @StepScope // Step scope is required for the @Value-annotation for querying job parameters.
  public FlatFileItemReader<IngredientEto> ingredientImportReader(
      @Value("#{jobParameters[pathToFile]}") String pathToFile) {

    return new FlatFileItemReaderBuilder<IngredientEto>().name("ingredientReader")
        .resource(new FileSystemResource(pathToFile)).delimited().delimiter(";")
        .names(new String[] { "name", "description", "price" }).targetType(IngredientEto.class).build();
  }

  @Bean
  public Step ingredientImportStep1() {

    return this.stepBuilderFactory.get("ingredientImportStep1").<IngredientEto, IngredientEto> chunk(10)
        .reader(ingredientImportReader(OVERRIDDEN_BY_EXPRESSION)).writer(ingredientImportWriter()).build();
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

    return this.jobBuilderFactory.get("ingredientImportJob").start(ingredientImportStep1()).build();
  }

  @Bean
  public IngredientEtoItemWriter ingredientImportWriter() {

    return new IngredientEtoItemWriter();
  }

}
