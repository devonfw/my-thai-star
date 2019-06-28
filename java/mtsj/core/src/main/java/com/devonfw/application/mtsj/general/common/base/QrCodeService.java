package com.devonfw.application.mtsj.general.common.base;

import com.devonfw.application.mtsj.usermanagement.common.api.to.UserQrCodeTo;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class QrCodeService {

    /** Logger instance. */
    private static final Logger LOG = LoggerFactory.getLogger(QrCodeService.class);

    private static final String PNG_EXTENSION = "PNG";

    private static final String BASE64_IDENTIFIER = "data:image/png;base64,";

    public static UserQrCodeTo generateQrCode(UserEntity userEntity) {
        String qrCodeString = "";

        try {
            String url = QrCodeService.generateUrl(userEntity);
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(url, BarcodeFormat.QR_CODE, 1000, 1000);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(matrix, PNG_EXTENSION, outputStream);
            qrCodeString = new Base64().encodeToString(outputStream.toByteArray());
        } catch (WriterException | IOException e) {
            LOG.debug(e.getMessage());
        }
        return new UserQrCodeTo(BASE64_IDENTIFIER + qrCodeString, userEntity.getSecret());
    }

    private static String generateUrl(UserEntity user) {
        return "otpauth://totp/" + user.getUsername() + ":"
                + user.getEmail() + "?secret="
                + user.getSecret() + "&issuer=My-Thai-Star";
    }
}
