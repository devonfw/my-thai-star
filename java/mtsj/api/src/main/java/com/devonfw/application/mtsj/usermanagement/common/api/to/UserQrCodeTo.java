package com.devonfw.application.mtsj.usermanagement.common.api.to;

import com.devonfw.module.basic.common.api.to.AbstractTo;

public class UserQrCodeTo extends AbstractTo {

    private static final long serialVersionUID = 1L;

    private String base64QrCode;

    /*
     * TODO: Encrypted object during transfer must be enforced with HTTPS or similar encryption
     */
    private String secret;

    /**
     * The constructor.
     */
    public UserQrCodeTo(String base64QrCode, String secret) {
        this.base64QrCode = base64QrCode;
        this.secret = secret;
    }

    public String getBase64QrCode() {
        return base64QrCode;
    }

    public void setBase64QrCode(String base64QrCode) {
        this.base64QrCode = base64QrCode;
    }

    public String getSecret() { return secret; }

    public void setSecret(String secret) { this.secret = secret; }
}
