package com.devonfw.application.mtsj.mailservice.logic.impl;

import javax.inject.Named;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

import com.devonfw.application.mtsj.mailservice.logic.api.Mail;

/**
 * Class for Mail service
 *
 */
@Named
@ConditionalOnProperty(prefix = "spring.mail", name = "enabled", havingValue = "true")
public class MailImpl implements Mail {

  /** Logger instance. */
  private static final Logger LOG = LoggerFactory.getLogger(MailImpl.class);

  @Autowired
  public MailSender mailSender;

  public boolean sendMail(String to, String subject, String text) {

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    message.setText(text);
    try {
      this.mailSender.send(message);
      return true;
    } catch (Exception e) {
      LOG.error("Error sending mail: " + e);
      return false;
    }
  }

}
