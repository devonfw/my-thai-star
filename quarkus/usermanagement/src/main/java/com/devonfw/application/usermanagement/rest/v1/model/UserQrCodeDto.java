package com.devonfw.application.usermanagement.rest.v1.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserQrCodeDto {

  private String base64QrCode;

  private String secret;

}
