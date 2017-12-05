package io.oasp.application.mtsj.mailservice;

/**
 * Interface for Mail Service
 *
 */
public interface Mail {

  /**
   * Sends an email using the spring boot mail module
   *
   * @param to who receives the email
   * @param subject the subject of the mail
   * @param text the content of the mail
   * @return the result of the sending process
   */
  boolean sendMail(String to, String subject, String text);
}
