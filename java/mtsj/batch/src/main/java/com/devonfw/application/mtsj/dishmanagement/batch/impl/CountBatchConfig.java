package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import java.util.List;

import javax.batch.api.chunk.ItemReader;
import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.item.ItemStream;
import org.springframework.batch.item.ItemStreamReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * This is an example batch which shows how to recover from failed batch runs. In fact all runs of the batch will fail.
 * Probably the most interesting class is {@link CountItemReader} which implements the {@link ItemStream} interface. To
 * make this demonstration useful it is required that we use a "persistent" H2 database. This can be achieved by using
 * H2s auto-Server-mode when running this batch: <br/>
 * {@code java -jar mtsj-batch-version>-SNAPSHOT-bootified.jar --spring.datasource.url="jdbc:h2:~/mts;AUTO_SERVER=TRUE" --spring.main.web-application-type=none --spring.batch.job.names=countJob}
 */
@Configuration
@EnableBatchProcessing
public class CountBatchConfig {

  private final static Logger LOG = LoggerFactory.getLogger(CountBatchConfig.class);

  @Inject
  private JobBuilderFactory jobBuilderFactory;

  @Inject
  private StepBuilderFactory stepBuilderFactory;

  @Bean
  public Step countStep1() {

    return this.stepBuilderFactory.get("countStep1").<Integer, Integer> chunk(10).reader(countReader())
        .writer(countWriter()).build();
  }

  @Bean
  public ItemWriter<? super Integer> countWriter() {

    return (List<? extends Integer> items) -> {
      for (Integer i : items) {
        LOG.info("Writing " + i);
      }
    };
  }

  /**
   * Defines the ItemReader for this batch. Please Notice that return type of this method is not {@link ItemReader} but
   * {@link ItemStreamReader}. This is required for recognizing this bean as implementing the {@link ItemStream}
   * interface.
   *
   * @return ItemReader for this batch.
   */
  @Bean
  public ItemStreamReader<? extends Integer> countReader() {

    return new CountItemReader();
  }

  @Bean
  public Job countJob() {

    return this.jobBuilderFactory.get("countJob").incrementer(new RunIdIncrementer()).start(countStep1()).build();
  }

}
