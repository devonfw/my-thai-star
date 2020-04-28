package com.devonfw.application.mtsj.dishmanagement.batch.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemStream;
import org.springframework.batch.item.ItemStreamException;
import org.springframework.batch.item.ItemStreamReader;
import org.springframework.batch.item.NonTransientResourceException;
import org.springframework.batch.item.ParseException;
import org.springframework.batch.item.UnexpectedInputException;

/**
 * Dummy implementation for a {@link ItemReader} which also implements {@link ItemStream} to handle restarts.
 *
 */
public class CountItemReader implements ItemStreamReader<Integer> {

  private final static Logger LOG = LoggerFactory.getLogger(CountBatchConfig.class);

  private int maxCount = 100;

  private int currentIndex = 0;

  private static final String CURRENT_INDEX = "current.index";

  @Override
  public Integer read() throws Exception, UnexpectedInputException, ParseException, NonTransientResourceException {

    if (this.currentIndex < this.maxCount) {
      LOG.info("Reading " + this.currentIndex);
      Thread.sleep(150);
      if (this.currentIndex == 28) {
        throw new RuntimeException("Batch error");
      }
      return this.currentIndex++;
    } else {
      return null;
    }
  }

  @Override
  public void open(ExecutionContext executionContext) throws ItemStreamException {

    // Restore index from previous (failed) run from ExecutionContext, if available.
    if (executionContext.containsKey(CURRENT_INDEX)) {
      this.currentIndex = Integer.valueOf(executionContext.getInt(CURRENT_INDEX)).intValue();
    } else {
      this.currentIndex = 0;
    }
  }

  @Override
  public void update(ExecutionContext executionContext) throws ItemStreamException {

    // Save current index to ExecutionContext
    executionContext.putInt(CURRENT_INDEX, this.currentIndex);
  }

  @Override
  public void close() throws ItemStreamException {

  }
}