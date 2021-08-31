package com.devonfw.application.mtsj.bookingmanangement.common;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TokenBuilder {

  public static String build(String email, String type) {

    MessageDigest md = null;
    try {
      md = MessageDigest.getInstance("MD5");
    } catch (NoSuchAlgorithmException e) {
      log.info("Token build error", e);
    }

    LocalDateTime localDateTime = LocalDateTime.ofInstant(Instant.now(), ZoneId.systemDefault());
    String date = String.format("%04d%02d%02d_", localDateTime.getYear(), localDateTime.getMonthValue(),
        localDateTime.getDayOfMonth());
    String time = String.format("%02d%02d%02d", localDateTime.getHour(), localDateTime.getMinute(),
        localDateTime.getSecond());
    md.update((email + date + time).getBytes());
    byte[] digest = md.digest();
    StringBuilder sb = new StringBuilder();
    for (byte b : digest) {
      sb.append(String.format("%02x", b & 0xff));
    }
    return type + date + sb;
  }
}
