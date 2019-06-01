package com.devonfw.application.mtsj.general.common.impl.security.twofactor;

import com.devonfw.application.mtsj.usermanagement.dataaccess.api.UserEntity;
import com.devonfw.application.mtsj.usermanagement.dataaccess.api.repo.UserRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import org.apache.commons.codec.binary.Base64;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.inject.Inject;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Controller
@Secured({"ROLE_Waiter", "ROLE_Manager", "ROLE_Customer"})
public class TwoFactorPairingController {

    @Inject
    private UserRepository userRepository;

    private static final String PNG_EXTENSION = "PNG";

    private static final String BASE64_IDENTIFIER = "data:image/png;base64,";

    @RequestMapping(value = "/pairing/{user}", method = RequestMethod.GET)
    public ResponseEntity<String> generatePairingURL(HttpServletResponse res, @PathVariable("user") String username) throws IOException, WriterException {

        final UserEntity user = userRepository.findByUsername(username);

        if (user != null && user.isUsingTwoFactor()) {
            res.setContentType(MediaType.TEXT_PLAIN_VALUE);
            String url = generateUrl(user);
            QRCodeWriter writer = new QRCodeWriter();
            BitMatrix matrix = writer.encode(url, BarcodeFormat.QR_CODE, 350, 350);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(matrix, PNG_EXTENSION, outputStream);
            String qrCodeString = new Base64().encodeToString(outputStream.toByteArray());
            return ResponseEntity.status(HttpServletResponse.SC_OK).body(BASE64_IDENTIFIER + qrCodeString);
        }
        else{
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("2FA is not activated");
        }
    }

    private String generateUrl(UserEntity user) {
        return "otpauth://totp/" + user.getUsername() + ":"
                + user.getEmail() + "?secret="
                + user.getSecret() + "&issuer=My-Thai-Star";
    }
}
