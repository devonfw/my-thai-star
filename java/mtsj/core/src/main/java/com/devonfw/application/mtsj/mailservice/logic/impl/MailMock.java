package com.devonfw.application.mtsj.mailservice.logic.impl;

import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import com.devonfw.application.mtsj.mailservice.logic.api.Mail;

/**
 * Mock class for Mail Service. The mail content is printed as a Log
 *
 */
@Named
@ConditionalOnProperty(prefix = "spring.mail", name = "enabled", havingValue = "false")
public class MailMock implements Mail {

  /**
   * Logger instance.
   */
  private static final Logger LOG = LoggerFactory.getLogger(MailMock.class);

  @Override
  public boolean sendMail(String to, String subject, String text) {

    StringBuilder sb = new StringBuilder();
    sb.append("To: ").append(to).append("|").append("Subject: ").append(subject).append("|").append("Text: ")
        .append(text);
    LOG.info(sb.toString());
    return true;
  }
}
