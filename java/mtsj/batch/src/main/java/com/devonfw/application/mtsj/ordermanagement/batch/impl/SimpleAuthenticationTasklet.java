package com.devonfw.application.mtsj.ordermanagement.batch.impl;

import javax.inject.Named;

import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * @author simon
 *
 */
@Named
public class SimpleAuthenticationTasklet implements Tasklet {

  @Override
  public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) throws Exception {

    String username = chunkContext.getStepContext().getStepExecution().getJobParameters().getString("username");
    String password = chunkContext.getStepContext().getStepExecution().getJobParameters().getString("password");
    Authentication authentication = new UsernamePasswordAuthenticationToken(username, password);

    SecurityContextHolder.getContext().setAuthentication(authentication);
    return RepeatStatus.FINISHED;
  }

}
