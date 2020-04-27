package com.devonfw.application.mtsj.ordermanagement.batch.impl;

import javax.inject.Inject;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.item.file.FlatFileItemWriter;
import org.springframework.batch.item.file.builder.FlatFileItemWriterBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

import com.devonfw.application.mtsj.bookingmanagement.common.api.to.BookingCto;

/**
 * Example for devon4j-batch module. This class configures a spring-batch witch exports all ingredients from mts to a
 * file. It requires one additional command line parameter "pathToFile" for the output file:<br/>
 * {@code java -jar mtsj-batch-3.2.0-SNAPSHOT-bootified.jar --spring.main.web-application-type=none --spring.batch.job.enabled=true --spring.batch.job.names=ingredientExportJob pathToFile=example.csv}
 *
 */
@Configuration
@EnableBatchProcessing
public class BookingsExportBatchConfig {

  // Pattern for simplifying DI with bean methods containing expressions.
  private static final String OVERRIDDEN_BY_EXPRESSION = null;

  @Inject
  private JobBuilderFactory jobBuilderFactory;

  @Inject
  private StepBuilderFactory stepBuilderFactory;

  @Bean
  public BookingCtoItemReader bookingCtoExportReader() {

    return new BookingCtoItemReader();
  }

  @Bean
  public Step bookingExportStep1() {

    return this.stepBuilderFactory.get("bookingsExportStep1").<BookingCto, BookingCto> chunk(10)
        .reader(bookingCtoExportReader()).writer(bookingExportWriter(OVERRIDDEN_BY_EXPRESSION)).build();
  }

  /*
   * Define the actual dishExportJob. Then name of the job according to the JobBuilderFactory should match the name of
   * this method. This in fact results in a job-bean named "dishExportJob" which matches to the job-name in the
   * registry. This makes things easier, since different job starters in spring-batch use the bean-name and some use the
   * job name from the JobRegistry.
   *
   */
  @Bean
  public Job bookingsExportJob() {

    return this.jobBuilderFactory.get("bookingsExportJob").start(bookingAuthenticationStep()).next(bookingExportStep1())
        .build();
  }

  @Bean
  public Step bookingAuthenticationStep() {

    return this.stepBuilderFactory.get("bookingAuthStep").tasklet(bookingAuthenticatonTasklet()).build();

  }

  @Bean
  public Tasklet bookingAuthenticatonTasklet() {

    return new SimpleAuthenticationTasklet();
  }

  @Bean
  @StepScope // Step scope is required for the @Value-annotation for querying job parameters.
  public FlatFileItemWriter<BookingCto> bookingExportWriter(@Value("#{jobParameters[pathToFile]}") String pathToFile) {

    return new FlatFileItemWriterBuilder<BookingCto>().name("bookingsWriter")
        .resource(new FileSystemResource(pathToFile)).delimited().delimiter(";")
        .names(new String[] { "booking.name", "user.username" }).build();
  }

}
